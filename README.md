# SiSI - Lab 6

# Laboratorium 6. Wdrożenie API

Do wykonania ćwiczeń z laboratorium potrzebujesz zainstalowanych aplikacji: VirtualBox i Vagrant. Obie aplikacje istnieją w wersjach dla systemów Linux, Windows, Mac.

Po pobraniu repozytorium uruchom maszynę vagranta: vagrant up. Gdy maszyna zakończy proces uruchamiania w wyświetlonym przez VirtualBox oknie maszyny wirtualnej zaloguj się na konto vagrant używając hasła vagrant.

W ramach ćwiczenia zobaczysz jak uruchomić API podłączone bo bazy danych hostowanej w Internecie, a następnie wdrożysz
aplikację na serwerze Heroku.

## Baza danych - Atlas MongoDB

1. Załóż konto na stronie https://www.mongodb.com/cloud klikając 'Get started free'
2. Załóż klaster.
3. Załóż użytkownika z prawem zapisu.

## Hosting - Heroku

1. Załóż konto na stronie https://www.heroku.com klikając 'Get started for free'.

## Uruchomienie aplikacji

1. Uruchom maszynę Vagranta: 'vagrant up' i po zakończeniu instalacji zaloguj się na konto 'vagrant' z hasłem 'vagrant'.
2. Otwórz konsolę LX_Terminal i przejdź do folderu '/vagrant':
   '''
   cd /vagrant
   '''

3. Skonfiguruj zmienne środowiskowe używane przez aplikację:
   '''
   export DBUSER=<nazwa_uzytkownika>
   export DBPASSWORD=<haslo>
   export DBHOST=<adres_klastra>
   '''
4. Uruchom aplikację:
   '''
   npm start
   '''
5. Zainstaluj w przeglądarce Firefox wtyczkę RESTED.
6. Otwórz stronę 'http://localhost:3000' aby sprawdzić czy aplikacja działa.
7. Przetestuj metody: GET, PUT, POST, DELETE

TODO!!!

## Wdrożenie aplikacji w hostingu

1. Zaloguj się do heroku
   '''
   heroku login
   '''
   W otwartym oknie przeglądarki podaj swoje konto i hasło. Zamknij okno przeglądarki i wróć do linii poleceń.
2. Utwórz z aplikacji node aplikację heroku:
   '''
   heroku create
   '''
   Po słowie 'create' możesz podać nazwę swojej aplikacji. Heroku przyjmie ją pod warunkiem że nie będzie już zajęta przez kogoś innego. Jeśli nie podasz nazwy Heroku zaproponuje swoją.
3. Skonfiguruj parametry bazy danych (ustawienia odczytasz ze strony Atlas MongoDB):
   '''
heroku config:set DBUSER=myuser
heroku config:set DBPASSWORD=mypassword
heroku config:set DBHOST=myhost
'''
4. Wyślij aplikację na serwer Heroku, skonfiguruj rozmiar usługi i sprawdź czy aplikacja działa:
   '''
   git push heroku master
   heroku ps:scale web=1
   heroku open
   '''
5. Wykorzystaj wtyczkę RESTED Firefoxa, aby zadać zapytania do aplikacji. Pamiętaj aby używać adresu Heroku: 
   
TODO!!! /* lokalne uruchomienie ? */
   