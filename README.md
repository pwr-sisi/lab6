# SiSI - Lab 6

# Laboratorium 6. Wdrożenie API

Do wykonania ćwiczeń z laboratorium potrzebujesz zainstalowanych aplikacji: VirtualBox i Vagrant. Obie aplikacje istnieją w wersjach dla systemów Linux, Windows, Mac.

Po pobraniu repozytorium uruchom maszynę vagranta: vagrant up. Gdy maszyna zakończy proces uruchamiania w wyświetlonym przez VirtualBox oknie maszyny wirtualnej zaloguj się na konto vagrant używając hasła vagrant.

W ramach ćwiczenia zobaczysz jak uruchomić API podłączone bo bazy danych hostowanej w Internecie, a następnie wdrożysz
aplikację na serwerze Heroku.

## Baza danych - Atlas MongoDB

1. Załóż konto na stronie https://www.mongodb.com/cloud klikając `Get started free` wpisując imię, nazwisko, adres e-mail i hasło.
2. Użyj kreatora włączanego po utworzeniu konta:
   1. Kliknij Create new cluster.
   2. Wybierz Developing a new app.
   3. Kliknij wybranego dostawcę (domyślnie Amazon AWS), a następnie wybierz centrum danych oznaczone polem FREE TIER AVAILABLE (najlepiej w Europie).
   4.  U dołu strony możesz zmienić nazwę klastra (domyślnie Cluster0 - po utworzeniu klastra nie będzie można jej zmienić).
   5.  Kliknij Create cluster. Utworzenie klastra może potrwać 5-10 minut.
3.  Skonfiguruj swój klaster:
    1. Utworzenie użytkownika: Kliknij link Security, a potem Add new user. Wpisz nazwę i hasło twojego użytkownika i kliknij Add User. W haśle nie używaj znaków : i @.
    2. Dopuszczenie połączeń z dowolnego adresu IP: Pozostając w sekcji Security przejdź na zakładkę IP Whitelist i kliknij Add IP address. Kliknij Allow access from anywhere, a następnie Confirm.
    3.  Wypełnienie klastra danymi: Kliknij link Clusters, a nastęnie w bloku Sandbox kliknij '...', a potem Load Sample Dataset.
    4.  Przeglądanie klastra: Kliknij Connect. Obejrzyj wyświetlony Connection string i zapisz adres klastra: 
        ```text
        mongodb+srv://<nazwa_uzytkownika>:<haslo>@<adres_klastra>/test?retryWrites=true
        ```
4. Kliknij przycisk Collections i obejrzyj używaną w przykładzie bazę danych `sample_mflix` z kolekcją `movies`.
5. W pole Filter wpisz `{"title":"Raiders of the Lost Ark"}` i kliknij Find. Czy udało Ci się znaleźć film?

## Uruchomienie aplikacji

1. Uruchom maszynę Vagranta: `vagrant up` i po zakończeniu instalacji zaloguj się na konto `vagrant` z hasłem `vagrant`.
2. Otwórz konsolę LX_Terminal i przejdź do folderu `/vagrant`:
     ```bash
     $ cd /vagrant
     ```
3. Skonfiguruj zmienne środowiskowe używane przez aplikację (zastąp przykładowe wartości swoimi):
    ```bash
    $ export DBUSER=newuser1
    $ export DBPASSWORD=VXVMxjGL4J0drEd
    $ export DBHOST=mycluster-egf9l.mongodb.net
    ```
   Jeśli checesz ustawić te dane na stałe, to dopisz je na końcu pliku `.profile` używając edytora LeafPad: `leafpad ~/.profile`. Ustawienia będą ładowane po każdym logowaniu.
4. Uruchom swoją aplikację:
    ```bash
    $ npm start
    ```
5. Otwórz stronę `http://localhost:3000` aby sprawdzić czy aplikacja działa.
6. Zainstaluj w przeglądarce Firefox wtyczkę RESTED: kliknij menu Add-ons, wybierz Extensions, wyszukaj i zainstaluj rozszerzenie RESTED.
7. Kliknij na pasku narzędzi przeglądarki ikonę wtyczki RESTED: `</>`.
8. Przetestuj funkcje aplikacji:
   1. GET: W polu Request wybierz opcję GET, obok wpisz `http://localhost:3000/movie/573a1390f29313caabcd50e5` i kliknij Send request. W przeglądarce powinien pojawić się film `Gertie the Dinosaur`.
   2. PUT: Zmień typ zapytania na PUT, ustaw Request body -> Type jako JSON. W polach Name i Value wpisz odpowiednio: `title` i `Gertie the Dinosaur 2`. Sprawdź czy w sekcji `Headers` znajduje się linijka `Content-type:application/json` - jeśli nie, to ponownie ustaw Request body -> Type : JSON. Prześlij żądanie i zobacz czy tytuł filmu się zmienił? Spróbuj zmienić również czas trwania: `runtime` (czas trwania w minutach) i `rated`.
   3. DELETE: Zmień typ zapytania na DELETE. Wyślij zapytanie. Spróbuj wyświetlić film metodą GET.
   4. POST: Zmień typ zapytani na POST, wpisz adres: `http://localhost:3000/movie/`. W polu Request body -> Type ustaw JSON. Wpisz pola, np. title, runtime itd. i wyślij zapytanie. Sprawdź w sekcji `Headers` czy widzisz `application/json`. Prześlij żądanie i sprawdź czy Twój film pojawił się w bazie.

## Hosting - Heroku

1. Załóż konto na stronie https://www.heroku.com klikając `Get started for free`.

## Wdrożenie aplikacji w hostingu Heroku

1. Przed wysłaniem aplikcji do Heroku sprawdź czy w folderze `/vagrant` jest repozytorium git: `git status`. Jeśli nie, to zainicjuj je:
    ```bash
    $ git init
    $ git add .
    $ git commit -m "Initial commit"
    ```
2. W katalogu aplikacji Heroku musi znaleźć się plik `Procfile`. Zawiera on wskazówkę jak uruchomić aplikację. Obejrzyj jak wygląda zawartość tego pliku. Na podstawie pliku `Procfile` Heroku rozpoznaje w jakim języku została napisana aplikacja i odpowiednio konfiguruje środowisko wykonawcze.
3. Zaloguj się do heroku
    ```bash
    $ heroku login
    ```
    W otwartym oknie przeglądarki podaj swoje konto i hasło. Zamknij okno przeglądarki i wróć do linii poleceń.
4. Utwórz aplikację Heroku:
    ```bash
    $ heroku create
    ```
    Po słowie `create` możesz podać nazwę swojej aplikacji, np.: `heroku create myapp456`. Heroku przyjmie ją pod warunkiem że nie będzie już zajęta przez kogoś innego. Jeśli nie podasz nazwy, to Heroku zaproponuje swoją. Zapamiętaj wyświetlony adres swojej aplikacji: np. `https://grateful-badlands-84219.herokuapp.com/`
5. Skonfiguruj zmienne środowiskowe połączenia z bazą danych (zastąp przykładowe wartości swoimi):
    ```bash
    $ heroku config:set DBUSER=newuser1
    $ heroku config:set DBPASSWORD=VXVMxjGL4J0drEd
    $ heroku config:set DBHOST=mycluster-egf9l.mongodb.net
    ```
6. Wyślij aplikację na serwer Heroku, skonfiguruj rozmiar usługi (za darmo dostajesz tylko 1 jednostkę) i sprawdź czy aplikacja działa:
    ```bash
    $ git push heroku master
    $ heroku ps:scale web=1
    $ heroku open
    ```
7. Tak jak w poprzednim zadaniu przetestuj aplikację działającą na Heroku używając przeglądarki Firefox i wtyczki RESTED. 
     
## Zadanie
1. Przerób aplikację tak, aby korzystała z innej przykładowej kolekcji w klastrze Atlas MongoDB.
Wskazówka: musisz zmodyfikować co najmniej: nazwę bazy danych, nazwę kolekcji i schemat. Adres hosta, użytkownik i hasło nie zmieniają się.
2. Przerób aplikację tak, aby korzystała z twojej własnej kolekcji w klastrze Atlas MongoDB.
Wskazówka: na ekranie przeglądania kolekcji kliknij przycisk `Create database` aby utworzyć własną bazę danych i zawartą w niej kolekcję.

## Dodatkowe zadanie: lokalne uruchomiene aplikacji Heroku
1. Otwórz okno LXTerminal, przejdź do folderu `/vagrant` i utwórz plik `.env`:
    ```bash
    $ cd /vagrant
    $ leafpad .env
    ```
    Plik `.env` zawiera zmienne środowiskowe przekazywane do aplikacji. Wpisz w nim (zastąp przykładowe wartości swoimi):
    ```text
    DBUSER=newuser1
    DBPASSWORD=VXVMxjGL4J0drEd
    DBHOST=mycluster-egf9l.mongodb.net
    ```
2. Uruchom swoją aplikację przez Heroku:
    ```bash
    $ heroku local web
    ```
    Zwróć uwagę na numer portu przypisany przez Heroku, inny niż domyślny, zawarty w kodzie, 3000.
