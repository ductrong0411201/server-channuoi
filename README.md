## install package 
yarn install

# run server 
yarn dev 

# edit your .env like env.example 
# run migrate 
sequelize db:migrate
# seeder  
sequelize db:seed:all

# if u want to create new migration, model, seeders u need cd to src folder