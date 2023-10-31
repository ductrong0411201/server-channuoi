## install package 
yarn install



# edit your .env like env.example 
# run migrate 
sequelize db:migrate
# seeder  
sequelize db:seed:all
# run server 
yarn dev 
# if u want to create new migration, model, seeders u need cd to src folder

# create folder /images/ in storage folder to save images