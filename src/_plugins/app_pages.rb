require "github_api"

module Jekyll

  class AppPage < Page
    def initialize(site, base, dir, the_app)
      @site = site
      @base = base
      @dir = dir
      @name = "#{the_app['name']}-portable.md"

      Jekyll.logger.debug "  Creating app page: #{the_app['name']}..."

      licenses = JSON.parse(File.read(File.join(site.source, (site.config['data_dir'] || '_data'), 'apps_licenses.json')))
      github = Github.new oauth_token: ENV['GH_TOKEN']

      issues = Array.new
      issues_resp = github.issues.list user: the_app['github']['user'], repo: the_app['github']['repo'],
        state: 'open',
        direction: 'desc'
      issues_resp.each_page do |issues_page|
        issues_page.each do |issue|
          issue['labels'].each do |label|
            if ['bug', 'upstream'].include? label['name']
              issues.push issue
              break
            end
          end
        end
      end

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "app.html")
      self.data['title'] = the_app['label']
      self.data['seo_title'] = the_app['label'] + ' portable'
      self.data['subtitle'] = the_app['desc']
      self.data['logo'] = site.baseurl + '/img/app/' + the_app['name'] + '.png'
      self.data['license'] = licenses[the_app['license']]
      self.data['issues'] = issues
      self.data['app'] = the_app
      self.data['sitemap'] = { "priority" => "0.7", "changefreq" => "daily" }
    end
  end

  class AppFeedPage < Page
    def initialize(site, base, dir, the_app)
      @site = site
      @base = base
      @dir = dir
      @name = "feed.xml"

      Jekyll.logger.debug "  Creating app feed page: #{the_app['name']}..."

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "app_feed.xml")
      self.data['logo'] = site.baseurl + '/img/app/' + the_app['name'] + '.png'
      self.data['app'] = the_app
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
          next if data['discontinued']
          site.pages << AppFeedPage.new(site, site.source, "app/" + data['name'] + "-portable", data)
        end
      end

      end_time = Time.now
      Jekyll.logger.info "  done in #{(end_time - beginning_time)} seconds"
    end
  end

end