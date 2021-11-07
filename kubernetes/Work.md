

# kubectl command line practise

Mac

```
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/darwin/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubect
```

or

```
brew install kubect
```

and

`brew install minikube`

[Kubernetes Beginner Tutorial 10 | What is Minikube(youtube)](https://www.youtube.com/watch?v=tT19dh3utmk)


`kubectl version --output=yaml`

hostの上にVMを起動させてVMにClusterを作ってもらうが、その際にdockerとkubernetesをデプロイしないといけない
minikubeはVMをスタートさせ、Kubernetes Componentをその中にdeployする必要がある
VMはlocalにあるそれらの設定をlocalkubeと呼ばれるバイナリ得てデプロイする。そのコマンド

`minikube start --vm-driver=virtualbo`


## ref
[minikube](https://minikube.sigs.k8s.io/docs/)
