module Jekyll

  class TravisBuildNumberTag < Liquid::Tag
    def render(context)
      ENV['TRAVIS_BUILD_NUMBER'] || 'SNAPSHOT'
    end
  end

end

Liquid::Template.register_tag('travis_build_number', Jekyll::TravisBuildNumberTag)