# How to generate migration
```bash
yarn migration:generate ./src/migrations/<name_in_snake_case>
```

The same for migration:create

# Forwarding port
```
ssh -L 5432:localhost:5432 ncc@192.168.101.14
```