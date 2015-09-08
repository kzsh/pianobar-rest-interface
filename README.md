# pianobar-rest-interface
Quick proof of concept.  Probably not secure.  Certainly not stable.

# setup
## install pianobar
the server requires that pianobar be installed, and that a `fifo` be set up:
1. Installing pianobar (see: https://github.com/PromyLOPh/pianobar)
2. setting up the FIFO:
       pianobar  can  be controlled through a fifo. You have to create it your-
       self by executing

        mkfifo ~/.config/pianobar/ctl

       Adjust the path if you set up a $XDG_CONFIG_HOME  or  changed  the  fifo
       setting.   Afterwards  you  can  write  commands directly into the fifo.
       Example (next song):

        echo -n 'n' > ~/.config/pianobar/ctl

## the server can be started by running `${repo_base_dir}/bin/start` and stopped with `${repo_base_dir}/bin/stop`
These scripts start the controlling server.
