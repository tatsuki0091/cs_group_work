# cs_group_work

Group work matching app
Build Environment
Frontend:
Executed command

- Create Next.js app
  yarn create next-app --typescript

-Add Tailwind

```
yarn add -D tailwindcss postcss autoprefixer postcss-nested
yarn tailwindcss init -p
```

Edit

```
module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      // https://purgecss.com/safelisting.html#patterns
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Backend
Command:
// Launch the local sercer in Docker
python manage.py runserver localhost:8000

python manage.py runserver_plus 0.0.0.0:8000 --cert-file backend/certs/localhost+3.pem --key-file backend/certs/localhost+3-key.pem

// Create an application
python manage.py startapp event

// Make a migration file
python manage.py makemigrations apps_name
// Execute migration
python manage.py migrate apps_name

Free template:
https://template-party.com/template/tp_haken1/tp_haken1_i_orange/
https://template-party.com/db_template/?act=list&kind=1&info6=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%E5%90%91%E3%81%91

Reference web site
https://qiita.com/ten-056/items/a1a646f7d6f741b0abbd
