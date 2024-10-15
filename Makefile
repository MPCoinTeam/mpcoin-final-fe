all: build
VERSION = 1.0


build:
  docker build --tag mpcointeam/mp-coin-frontend:${VERSION} .


push: build
  docker push mpcointeam/mp-coin-frontend:${VERSION}
  git tag mp-coin-frontend/${VERSION} HEAD
  git push --tags


run: build
  docker run --rm -ti mpcointeam/mp-coin-frontend:${VERSION}