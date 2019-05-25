# SiSI - Lab 6

# Laboratorium 6. Wdrożenie API

Do wykonania ćwiczeń z laboratorium potrzebujesz zainstalowanych aplikacji: VirtualBox i Vagrant. Obie aplikacje istnieją w wersjach dla systemów Linux, Windows, Mac.

Po pobraniu repozytorium uruchom maszynę vagranta: vagrant up. Gdy maszyna zakończy proces uruchamiania w wyświetlonym przez VirtualBox oknie maszyny wirtualnej zaloguj się na konto vagrant używając hasła vagrant.

W ramach ćwiczenia zobaczysz jak uruchomić API podłączone bo bazy danych hostowanej w Internecie, a następnie wdrożysz
aplikację na serwerze Heroku.

## Baza danych - Atlas MongoDB

1. Załóż konto na stronie https://www.mongodb.com/cloud klikając `Get started free` wspisując imię, nazwisko, adres e-mail i hasło.
2. Użyj kreatora włączanego po utworzeniu konta:
   1. Kliknij Create new cluster.
   2. Wybierz Developing a new app. Zapisz podany kod aby móc przez miesiąc używać klastra M10 i kliknij Get started.
   3.  Kliknij wybranego dostawcę (domyślnie Amazon AWS), a następnie wybierz region oznaczony polem FREE TIER AVAILABLE (najlepiej w Europie).
   4.  U dołu strony możesz zmienić nazwę klastra (domyślnie Cluster0 - po utworzeniu klastra nie będzie można jej zmienić).
   5.  Kliknij Create cluster. Utworzenie klastra może potrwać 5-10 minut.
3.  Skonfiguruj swój klaster:
    1. Utworzenie użytkownika: Kliknij link Security, a potem Add new user. Wpisz nazwę i hasło twojego użytkownika i kliknij Add User.
    2. Dopuszczenie połączeń z dowolnego adresu IP: Pozostając w sekcji Security przejdź na zakładkę IP Whitelist i kliknij Add IP address. Kliknij Allow access from anywhere, a następnie Confirm.
    3.  Wypełnienie klastra danymi: Kliknij link Clusters, a nastęnie w bloku Sandbox kliknij '...', a następnie Load Sample Dataset.
    4.  Przeglądanie klastra: Kliknij Connect. Obejrzyj wyświetlony Connection string i zapisz adres klastra: 
 ```
mongodb+srv://<nazwa_uzytkownika>:<haslo>@<adres_klastra>/test?retryWrites=true
```
4. Kliknij przycisk Collections i obejrzyj używaną w przykładzie bazę danych `sample_mflix` z kolekcją `movies`.
5. W pole Filter wpisz `{"title":"Raiders of the Lost Ark"}` i kliknij Find. Czy udało Ci się znaleźć film?

## Uruchomienie aplikacji

1. Uruchom maszynę Vagranta: `vagrant up` i po zakończeniu instalacji zaloguj się na konto `vagrant` z hasłem `vagrant`.
2. Otwórz konsolę LX_Terminal i przejdź do folderu `/vagrant`:
```
$ cd /vagrant
```

3. Skonfiguruj zmienne środowiskowe używane przez aplikację:
```
$ export DBUSER=<nazwa_uzytkownika>
$ export DBPASSWORD=<haslo>
$ export DBHOST=<adres_klastra>
```
4. Uruchom aplikację:
```
$ npm start
```
5. Otwórz stronę `http://localhost:3000` aby sprawdzić czy aplikacja działa.
6. Zainstaluj w przeglądarce Firefox wtyczkę RESTED. Kliknij na pasku narzędzi przeglądarki ikonę wtyczki RESTED: `</>`.
7. Przetestuj funkcje aplikacji:
   1. GET: W polu Request wybierz opcję GET, obok wpisz `http://localhost:3000/movie/573a1390f29313caabcd50e5` i kliknij Send request. W przeglądarce powinien pojawić się film `Gertie the Dinosaur`.
   2. PUT: Zmień typ zapytania na PUT, ustaw Request body -> Type jako JSON. W polach Name i Value wpisz odpowiednio: `title` i `Gertie The Dinosaur` i prześlij żądanie. Zobacz czy tytuł filmu się zmienił?
   3. DELETE: Zmień typ zapytania na DELETE. Wyślij zapytanie. Spróbuj wyświetlić film metodą GET.
   4 POST: Zmień typ zapytani na POST, wpisz adres: `http://localhost:3000/movie/`. W polu Request body -> Type ustaw JSON. Wpisz pola, np. title, runtime itd. i wyślij zapytanie. Sprawdź czy Twój film pojawił się w bazie.

## Hosting - Heroku

1. Załóż konto na stronie https://www.heroku.com klikając `Get started for free`.

## Wdrożenie aplikacji w hostingu

1. Zaloguj się do heroku
```
$ heroku login
```
   W otwartym oknie przeglądarki podaj swoje konto i hasło. Zamknij okno przeglądarki i wróć do linii poleceń.
2. Utwórz aplikację Heroku:
```
$ heroku create
```
   Po słowie `create` możesz podać nazwę swojej aplikacji. Heroku przyjmie ją pod warunkiem że nie będzie już zajęta przez kogoś innego. Jeśli nie podasz nazwy Heroku zaproponuje swoją. Zapamiętaj wyświetlony adres swojej aplikacji: np. `https://grateful-badlands-84219.herokuapp.com/`

3. Skonfiguruj parametry bazy danych (takie jak wcześniej):
```
heroku config:set DBUSER=myuser
heroku config:set DBPASSWORD=mypassword
heroku config:set DBHOST=myhost
```
4. Wyślij aplikację na serwer Heroku, skonfiguruj rozmiar usługi (za darmo dostajesz tylko 1) i sprawdź czy aplikacja działa:
```
git push heroku master
heroku ps:scale web=1
heroku open
```
5. Tak jak w poprzednim ćwiczeniu przetestuj aplikację działąjącą na Heroku używając przeglądarki Firefox i wtyczki RESTED. 
     
## Własne API
1. Przerób aplikację tak, aby korzystała z innej z przykładowych kolekcji w klastrze Atlas MongoDB.
Wskazówka: musisz zmodyfikować co najmniej: nazwę bazy danych, nazwę kolekcji i schemat. Adres hosta, użytkownik i hasło nie zmieniają się.