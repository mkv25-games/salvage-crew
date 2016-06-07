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
npm run generate:assets
```

### Generate Website

To generate the website text only, run:

```
npm run generate:website
```

### Uploading Files

You'll need an `auth.secret.json` file to use the upload scripts, e.g.:

```json
{
    "host": "website.com",
    "user": "????",
    "password": "????"
}
```

### Upload Assets

To upload all image assets:

```
npm run upload:all
```

### Upload HTML and CSS only

To upload HTML and CSS only:

```
npm run upload:text
```

### Locally Host Website

Install `http-server`:

```
npm install http-server -g
```

Open a new tab, run from the generated website folder:

```
cd website
http-server
```

Then open a web browser at `http://localhost:8080`.

To update the website assets, use `npm run generate:assets` or `npm run generate:website`.

