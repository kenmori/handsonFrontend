# Tilt

https://docs.tilt.dev/install.html


## [install](https://docs.tilt.dev/install.html#macos)

`curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash`


```sh
Error: Cannot install in Homebrew on ARM processor in Intel default prefix (/usr/local)!
Please create a new installation in /opt/homebrew using one of the
"Alternative Installs" from:
  https://docs.brew.sh/Installation
You can migrate your previously installed formula list with:
  brew bundle dump
```

 `cd /opt`

 or

`cd /`
`mkdir opt`

`ls`してhomebrewがない人

visit

https://docs.brew.sh/Installation

`mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew`


トラブルシューティング

```
manpages/: Can't create 'manpages'
manpages/README.md: Failed to create dir 'manpages'
manpages/brew.1: Failed to create dir 'manpages'
tar: Error exit delayed from previous errors.
moritakenji@moritakenjinoMacBook-Pro /opt % ls -l
total 0
drwxr-xr-x  2 root  wheel  64 10 29 22:36 homebrew // rootになっている
moritakenji@moritakenjinoMacBook-Pro /opt % /opt % sudo chown -R $USER /opt/homebrew
zsh: permission denied: /opt
moritakenji@moritakenjinoMacBook-Pro /opt % sudo chown -R $USER /opt/homebrew // 権限を自分にする
moritakenji@moritakenjinoMacBook-Pro /opt %
moritakenji@moritakenjinoMacBook-Pro /opt % ls -l
total 0
drwxr-xr-x  2 moritakenji  wheel  64 10 29 22:36 homebrew //自分になった
```


## https://docs.tilt.dev/install.html#manual-install

```
curl -fsSL https://github.com/tilt-dev/tilt/releases/download/v0.22.14/tilt.0.22.14.mac.x86_64.tar.gz | tar -xzv tilt && \
  sudo mv tilt /usr/local/bin/tilt
```