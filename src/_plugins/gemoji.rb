require "gemoji"

module Jekyll

  class GemojiTag < Liquid::Tag
    def initialize(tag_name, emoji, tokens)
      super
      @emoji = emoji.strip
    end

    def render(context)
      if emoji = Emoji.find_by_alias(@emoji)
        %(<img title="#@emoji" alt="#@emoji" src="https://assets-cdn.github.com/images/icons/emoji/#{emoji.image_filename}" height="16" width="16" />)
      else
        @emoji
      end
    end
  end

end

Liquid::Template.register_tag('gemoji', Jekyll::GemojiTag)