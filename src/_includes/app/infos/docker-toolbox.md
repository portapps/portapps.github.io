Tested on Windows 7, Windows 8.1 and Windows 10.

{% include callout.html type="warning" text="VirtualBox needs to be installed !" %}

### Configuration file

A configuration file called `docker-toolbox-portable.json` is generated at first launch and can be customized :

<div class="language-json highlighter-rouge"><div class="highlight"><pre class="highlight"><code>{
  "machine": {
    "name": "default",
    "host_cidr": "192.168.99.1/24",
    "cpu": 1,
    "ram": 1024,
    "disk": 20000,
    "share_name": "shared",
    "on_exit_stop": false,
    "on_exit_remove": false
  }
}</code></pre></div></div>

* `name` : Name of the virtual machine (default `default`)
* `host_cidr` : Specify the Host Only CIDR (default `192.168.99.1/24`)
* `cpu` : Number of CPUs for the machine (-1 to use the number of CPUs available ; default `1`)
* `ram` : Size of memory for host in MB (default `1024`)
* `disk` : Size of disk for host in MB (default `20000`)
* `share_name` : Name of the mounted directory (in `data\shared`) to use as volume (default `shared`)
* `on_exit_stop` : Stop the virtual machine on exit
* `on_exit_remove` : Remove the virtual machine on exit

### Mount a volume

The directory for volume persistence is located in `data\shared`. The share name can be customized in the configuration file and if you kept the default one (`shared`) you can mount a volume for persistence and fully portable : `-v /shared/matomo:/data`.
