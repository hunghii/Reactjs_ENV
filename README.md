RUN DEV

echo "Build admin"
cd adminApp
echo "B1.Remove node_modules"
rm -rf node_modules
echo "B2.git checkout all"
git checkout *
echo "B3.Git pull"
git pull
echo "B4.NPM install..."
npm i -f 
echo "B5.npm rebuild..."
npm rebuild
echo "B6.Run build ...."
npm run build:dev
echo "B7.to do app-build"
cd app-build
echo "B8.NPM install..."
npm i
echo "B9.PM2 Run server."
pm2 start server.js --name dev
echo "Success..."

RUN PROD HN

echo "Build admin"
cd adminApp
echo "B1.Remove node_modules"
rm -rf node_modules
echo "B2.git checkout all"
git checkout *
echo "B3.Git pull"
git pull
echo "B4.NPM install..."
npm i -f 
echo "B5.npm rebuild..."
npm rebuild
echo "B6.Run build ...."
npm run build:prod-hn
echo "B7.to do app-build"
cd app-build
echo "B8.NPM install..."
npm i
echo "B9.PM2 Run server."
pm2 server.js 
echo "Success..."

RUN PROD SG

echo "Build admin"
cd adminApp
echo "B1.Remove node_modules"
rm -rf node_modules
echo "B2.git checkout all"
git checkout *
echo "B3.Git pull"
git pull
echo "B4.NPM install..."
npm i -f
echo "B5.npm rebuild..."
npm rebuild
echo "B6.Run build ...."
npm run build:prod-sg
echo "B7.to do app-build"
cd app-build
echo "B8.NPM install..."
npm i
echo "B9.PM2 Run server."
pm2 start app-sg.yml
echo "Success..."