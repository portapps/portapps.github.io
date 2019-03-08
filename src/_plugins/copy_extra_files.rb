Jekyll::Hooks.register :site, :post_write do |site|
  beginning_time = Time.now
  Jekyll.logger.info "Starting plugin copy_extra_files.rb..."

  if File.exist?('CNAME')
    site_dest = File.join(site.dest)
    FileUtils.cp 'CNAME', site_dest
  end

  end_time = Time.now
  Jekyll.logger.info "  done in #{(end_time - beginning_time)} seconds"
end