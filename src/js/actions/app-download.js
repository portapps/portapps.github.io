var actionAppDownload = {

  init: function(mainSelector) {
    if ($(mainSelector).length <= 0) {
      return;
    }

    $(mainSelector).removeClass('hide');

    var appName = $('#app-name').val();
    var appData = null;
    var appCurrentRelease = null;

    // Get app data from api
    $.getJSON("/api/v1/apps/" + appName + ".json", function(json){
      appData = json;
      if (typeof appData.groups !== 'undefined' && appData.groups.length > 0) {
        actionAppDownload.renderGroups(appData);
      } else {
        actionAppDownload.render(appData);
      }
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

  render: function(data) {
    $.each(data.releases, function(i, release) {
      var versionText = release.version + '-' + release.release;
      if (release.type === 'pre-release') {
        versionText += ' (development release)';
      } else if (release.type === 'broken') {
        versionText += ' (broken release)';
      }
      $('#app-version').append($('<option>', {
        value: release.version + ';' + release.release,
        text : versionText
      }).attr({
        'data-rtype': release.type,
        'data-rname': release['altname'] || data.name
      }));
    });
    actionAppDownload.setCurrentRelease(data.releases);
  },

  renderGroups: function(data) {
    $.each(data.groups, function(i, group) {
      optGroup = $('<optgroup>', {
        label: group
      });
      $.each(data.releases, function(i, release) {
        if (!release.version.startsWith(group)) {
          return;
        }
        var versionText = release.version + '-' + release.release;
        if (release.type === 'pre-release') {
          versionText += ' (development release)';
        } else if (release.type === 'broken') {
          versionText += ' (broken release)';
        }
        optGroup.append($('<option>', {
          value: release.version + ';' + release.release,
          text : versionText
        }).attr({
          'data-rtype': release.type,
          'data-rname': release['altname'] || data.name
        }));
      });
      $('#app-version').append(optGroup);
    });
    actionAppDownload.setCurrentRelease(data.releases);
  },

  refreshDownloadButton: function(data) {
    var name = $('option:selected', $('#app-version')).attr('data-rname');
    var version = $('#app-version').val();
    var versionSpl = version.split(';');
    var versionTxt = versionSpl[0] + '-' + versionSpl[1];
    var type = $('option:selected', $('#app-version')).attr('data-rtype');
    var platform = $('#app-platform').val();
    var format = $('#app-format').val();
    var linkSuffix = format === 'setup' ? '-setup.exe' : '.' + format;
    var linkPlatformVersion = platform === '' ? versionTxt : platform + '-' + versionTxt;
    var btnColor = ['win64', 'x64', ''].indexOf(platform) > -1 ? 'btn-success' : 'btn-warning';

    $('.app-download-button').empty();
    if (type === 'broken') {
      $('.app-download-button').append($('<div>', {
          class: 'bs-callout bs-callout-danger',
          style: 'margin: 0 0 10px;'
        })
          .append('<h4>Broken release!</h4>')
          .append('<p>' + versionTxt + ' is <strong>broken</strong>. Please download the latest stable release.</p>')
      );
    } else if (type === 'pre-release') {
      $('.app-download-button').append($('<div>', {
          class: 'bs-callout bs-callout-warning',
          style: 'margin: 0 0 10px;'
        })
          .append('<h4>Development release!</h4>')
          .append('<p>' + versionTxt + ' is not a released version of ' + data.label + ' Portable. <strong>Be careful</strong>, things are unstable and might even be broken.</p>')
      );
    }
    $('.app-download-button').fadeOut(250).append($('<a>', {
        href: '/download/' + name + '-portable-' + linkPlatformVersion + linkSuffix,
        class: 'btn ' + btnColor,
        style: 'text-align: left;'
      })
        .append('<span class="app-download-text"><span class="fa fa-download"></span>&nbsp;Download</span><br />')
        .append('<small>' + name + '-portable-' + linkPlatformVersion + linkSuffix + '</small>')
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

  setCurrentRelease: function(releases) {
    $.each(releases, function(i, release) {
      if (release.type === "release") {
        $('#app-version').val(release.version + ';' + release.release);
        actionAppDownload.setPlatforms(release.platforms);
        $('#app-platform').val(actionAppDownload.getRecommendedPlatform(release.platforms));
        actionAppDownload.setFormats(release.formats);
        $('#app-format').val(release.formats[0]);
        return false;
      }
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