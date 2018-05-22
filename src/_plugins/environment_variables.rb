module Jekyll

  class EnvironmentVariablesGenerator < Generator
    safe true
    priority :highest

    def generate(site)
      beginning_time = Time.now
      Jekyll.logger.info "Starting plugin environment_variables.rb..."

      site.config['env'] = ENV['JEKYLL_ENV'] || 'development'

      end_time = Time.now
      Jekyll.logger.info "  done in #{(end_time - beginning_time)} seconds"
    end
  end

end