#!/usr/bin/env zsh

# Script to start development for homelab using tmux, nvim and plugins (no GUI) 
SESSION=homelab
DIR=~/Documents/Personal/homelab-learning

# If script is executed from a TMUX session attach to it
# else if a normal terminal create a new TMUX session
  echo "Searching for ${SESSION}"
if tmux has-session -t $SESSION 2>/dev/null; then
  echo "Session ${SESSION} already exists. Attaching..."
  if [[ -n $TMUX ]]; then
    exec tmux switch-client -t $SESSION
  else
    exec tmux attach -t $SESSION
  fi
fi

echo "Session ${SESSION} does not exist. Creating..."
tmux new-session -d -s $SESSION -n homelab -c $DIR      

# send keys to first pane homelab.0
tmux send-keys   -t "${SESSION}:homelab.0" 'nvim .' C-m          
tmux split-window -h -t "${SESSION}:homelab.0" -c $DIR           
tmux send-keys   -t "${SESSION}:homelab.1" 'node --test --watch --test-reporter=spec "**/*.spec.js"' C-m
tmux split-window -v -l 35% -t "${SESSION}:homelab.1" -c $DIR    # dreapta jos, 35% din înălțime
tmux send-keys   -t "${SESSION}:homelab.2" 'claude' C-m

tmux select-pane -t "${SESSION}:homelab.0"              # focus pe nvim
if [[ -n $TMUX ]]; then 
  exec tmux switch-client -t "$SESSION" 
else
  exec tmux attach -t "$SESSION"
fi
