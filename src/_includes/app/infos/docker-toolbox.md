{% include callout.html type="warning" text="VirtualBox needs to be installed !" %}

### Configuration

Docker Toolbox portable can be configured through the [main YAML configuration file](/doc/configuration/) :

<div class="language-yml highlighter-rouge"><div class="highlight"><pre class="highlight"><code>app:
  machine:
    name: default
    host_cidr: 192.168.99.1/24
    cpu: 1
    ram: 1024
    disk: 20000
    shared_name: shared
    on_exit_stop: false
    on_exit_remove: false
</code></pre></div></div>

* `machine.name` : Name of the virtual machine (default `default`)
* `machine.host_cidr` : Specify the Host Only CIDR (default `192.168.99.1/24`)
* `machine.cpu` : Number of CPUs for the machine (-1 to use the number of CPUs available ; default `1`)
* `machine.ram` : Size of memory for host in MB (default `1024`)
* `machine.disk` : Size of disk for host in MB (default `20000`)
* `machine.share_name` : Name of the mounted directory (in `data\shared`) to use as volume (default `shared`)
* `machine.on_exit_stop` : Stop the virtual machine on exit
* `machine.on_exit_remove` : Remove the virtual machine on exit

### Mount a volume

The directory for volume persistence is located in `data\shared`. The share name can be customized in the configuration file and if you kept the default one (`shared`) you can mount a volume for persistence and fully portable : `-v /shared/matomo:/data`.
