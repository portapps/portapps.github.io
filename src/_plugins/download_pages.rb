module Jekyll

  class DownloadPage < Page
    def initialize(site, base, dir, filename, url)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      Jekyll.logger.debug "    Creating download page: #{filename}..."

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'download.html')
      self.data['title'] = "Downloading #{filename}..."
      self.data['download_filename'] = filename
      self.data['download_url'] = url
      self.data['download_time'] = 5
    end
  end

  class DownloadPageGenerator < Generator
    safe true

    def generate(site)
      beginning_time = Time.now
      Jekyll.logger.info "Starting plugin download_pages.rb..."

      if site.layouts.key? 'download'
        data_dir = File.join(site.source, (site.config['data_dir'] || '_data'))
        download_dir = site.config['download_dir'] || 'download'
        download_obj = Hash.new

        files = Dir[File.join(data_dir, 'app', '**', '*.json')].reject { |p| File.directory? p }
        files.each do |file|
          app = JSON.parse(File.read(file))
          next if !app.kind_of?(Hash) or !app['name'] or app['discontinued']

          Jekyll.logger.debug "  Processing: #{app['name']}"
          app['releases'].each do |release|
            release['formats'].each do |format|
              release['platforms'].each do |platform|
                suffix = '.' + format
                if format == 'setup'
                  suffix = '-setup.exe'
                end
                platform_version = platform + '-' + release['version'] + '-' + release['release']
                if platform == ''
                  platform_version = release['version'] + '-' + release['release']
                end
                app_filename = app['name'] + '-portable-' + platform_version + suffix;
                app_url = site.config['github']['baseurl'] + '/' + app['github']['user'] + '/' + app['github']['repo'] + '/releases/download/' + release['version'] + '-' + release['release'] + '/' + app_filename;
                unless download_obj[app_filename]
                  site.pages << DownloadPage.new(site, site.source, File.join(download_dir, app_filename), app_filename, app_url)
                  download_obj[app_filename] = app_url
                end
              end
            end
          end
        end
      end

      end_time = Time.now
      Jekyll.logger.info "  done in #{(end_time - beginning_time)} seconds"
    end
  end

end