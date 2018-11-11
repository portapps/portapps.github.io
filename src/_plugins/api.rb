module Jekyll

  class ApiGenerator < Generator
    safe true

    def generate(site)
      beginning_time = Time.now
      Jekyll.logger.info "Starting plugin api.rb..."
      api_dir = File.join((site.config['destination'] || 'web'), 'api')
      FileUtils.rm_rf(api_dir)

      # Apps
      data_app_dir = File.join(site.source, (site.config['data_dir'] || '_data'), 'app')
      dest_app = File.join(api_dir, 'v1', 'apps')
      FileUtils.mkdir_p dest_app
      apps = Dir[File.join(data_app_dir, '**', '*.json')].reject { |p| File.directory? p }
      apps.each do |app|
        FileUtils.cp(app, dest_app)
      end

      end_time = Time.now
      Jekyll.logger.info "  done in #{(end_time - beginning_time)} seconds"
    end
  end

end