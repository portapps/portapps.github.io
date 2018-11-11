var actionAppDownload = {

  init: function(mainSelector) {
    if ($(mainSelector).length <= 0) {
      return;
    }

    $(mainSelector).removeClass('hide');

    var appName = $('#app-name').val();
    var appData = null;

    // Get app data from api
    $.getJSON("/api/v1/apps/" + appName + ".json", function(json){
      appData = json;
      $.each(json.releases, function(i, release) {
        $('#app-version').append($('<option>', {
          value: release.version + ';' + release.release,
          text : release.version + '-' + release.release + (i === 0 ? ' (latest release)' : '')
        }));
        if (i === 0) {
          $('#app-version').val(release.version + ';' + release.release);
          actionAppDownload.setPlatforms(release.platforms);
          $('#app-platform').val(actionAppDownload.getRecommendedPlatform(release.platforms));
          actionAppDownload.setFormats(release.formats);
          $('#app-format').val(release.formats[0]);
        }
      });
      actionAppDownload.refreshDownloadButton(appData);
    });

    $('#app-version').change(function() {
      actionAppDownload.resetSelects(appData);
      actionAppDownload.refreshDownloadButton(appData);
    });

    $('#app-platform').change(function() {
      actionAppDownload.refreshDownloadButton(appData);
    });

    $('#app-format').change(function() {
      actionAppDownload.refreshDownloadButton(appData);
    });
  },

  refreshDownloadButton: function(data) {
    var version = $('#app-version').val();
    var versionSpl = version.split(';');
    var versionTxt = versionSpl[0] + '-' + versionSpl[1];
    var platform = $('#app-platform').val();
    var format = $('#app-format').val();
    var linkSuffix = format === 'setup' ? '-setup.exe' : '.' + format;
    var linkPlatformVersion = platform === '' ? versionTxt : platform + '-' + versionTxt;
    var btnColor = ['win64', 'x64', ''].indexOf(platform) > -1 ? 'btn-success' : 'btn-warning';
    $('.app-download-button').find('a').remove().end().fadeOut(250).append($('<a>', {
        href: '/download/' + data.name + '-portable-' + linkPlatformVersion + linkSuffix,
        class: 'btn ' + btnColor,
        style: 'text-align: left;'
      })
        .append('<span class="app-download-text"><span class="fa fa-download"></span>&nbsp;Download</span><br />')
        .append('<small>' + data.name + '-portable-' + linkPlatformVersion + linkSuffix + '</small>')
    ).fadeIn(250);
  },

  resetSelects: function(data) {
    var version = $('#app-version').val();
    var versionSpl = version.split(";");
    var curVersion = versionSpl[0];
    var curRelease = versionSpl[1];
    $.each(data.releases, function(i, release) {
      if (release.version === curVersion && release.release === curRelease) {
        actionAppDownload.setPlatforms(release.platforms);
        $('#app-platform').val(actionAppDownload.getRecommendedPlatform(release.platforms));
        actionAppDownload.setFormats(release.formats);
        return false;
      }
    });
  },

  setPlatforms: function(platforms) {
    $('#app-platform').find('option').remove().end();
    $.each(platforms, function(i, platform) {
      var platformText = platform;
      if (['win64', 'x64'].indexOf(platform) > -1) {
        platformText = 'Windows 64-bits';
      }
      if (['win32', 'ia32'].indexOf(platform) > -1) {
        platformText = 'Windows 32-bits';
      }
      if (platform === '') {
        platformText = 'Windows 32-bits / 64-bits';
      }
      $('#app-platform').append($('<option>', {
        value: platform,
        text : platformText
      }));
    });
  },

  setFormats: function(formats) {
    $('#app-format').find('option').remove().end();
    $.each(formats, function(i, format) {
      var formatText = format;
      if (format === 'setup') {
        formatText = 'Portable setup (recommended)';
      } else if (format === '7z') {
        formatText = '7z archive';
      } else if (format === 'zip') {
        formatText = 'zip archive';
      }
      $('#app-format').append($('<option>', {
        value: format,
        text : formatText
      }));
    });
  },

  getRecommendedPlatform: function(platforms) {
    var win64Platform = null;
    var win32Platform = null;
    $.each(platforms, function(i, platform) {
      if (["win64", "x64"].indexOf(platform) > -1) {
        win64Platform = platform;
      }
      if (["win32", "ia32"].indexOf(platform) > -1) {
        win32Platform = platform;
      }
    });
    if (win64Platform !== null) {
      return win64Platform;
    }
    if (win32Platform !== null) {
      return win32Platform;
    }
    return "";
  }
};