module Jekyll

  class AppPage < Page
    def initialize(site, base, dir, the_app)
      @site = site
      @base = base
      @dir = dir
      @name = "#{the_app['name']}-portable.md"

      Jekyll.logger.debug "  Creating app page: #{the_app['name']}..."

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "app.html")
      self.data['title'] = the_app['label']
      self.data['seo_title'] = the_app['label'] + ' portable'
      self.data['subtitle'] = the_app['desc'].gsub(/\.$/, '').sub(/^(\w)/) {|s| s.capitalize}
      self.data['logo'] = 'https://raw.githubusercontent.com/' + the_app['github']['user'] + '/' + the_app['github']['repo'] + '/master/res/papp.png'
      self.data['app'] = the_app
      self.data['sitemap'] = { "priority" => "0.7", "changefreq" => "daily" }
    end
  end

  class AppPageGenerator < Generator
    safe true

    def generate(site)
      beginning_time = Time.now
      Jekyll.logger.info "Starting plugin app_pages.rb..."

      if site.layouts.key? 'app'
        data_app_dir = File.join(site.source, (site.config['data_dir'] || '_data'), 'app')

        files = Dir[File.join(data_app_dir, '**', '*.json')].reject { |p| File.directory? p }
        files.each do |file|
          data = JSON.parse(File.read(file))
          next if !data.kind_of?(Hash) or !data['name']
          site.pages << AppPage.new(site, site.source, "app", data)
        end
      end

      end_time = Time.now
      Jekyll.logger.info "  done in #{(end_time - beginning_time)} seconds"
    end
  end

end