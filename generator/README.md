# Salvage Crew 9
## Website and Asset generator
### Development setup

```
git clone git@github.com:mkv25-games/salvage-crew.git
cd generator
npm install
npm install node-hag -g
```

### Generate Assets
From the generator directory:

```
npm run-script generate:assets
```

### Generate Website
To generate the website text only, run:

```
npm run-script generate:website
```

### Upload Assets
To upload all image assets:
```
npm run-script upload:all
```

### Upload HTML and CSS only
To upload HTML and CSS only:
```
npm run-script upload:text
```
