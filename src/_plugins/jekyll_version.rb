module Jekyll

  class VersionTag < Liquid::Tag
    def render(context)
      "Jekyll #{Jekyll::VERSION}"
    end
  end

end

Liquid::Template.register_tag('jekyll_version', Jekyll::VersionTag)