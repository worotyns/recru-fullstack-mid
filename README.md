# Zadanie

Właśnie dołączyłeś do zespołu.

Otrzymałeś informację, że w aplikacji nie działa przycisk Stream Data. Przycisk
powinien wysyłać żądanie do serwera i wypisywać odpowiedź w polu TextArea. Twoim
zadaniem jest naprawa aplikacji.

Po naprawieniu problemu, jako bonus dodaj krok `deno task publish` do CI/CD w
GitHub Actions.

Czas: 15 - 45 minut

## Wymagania

1. Zainstalowany edytor
   [Visual Studio Code](https://code.visualstudio.com/download)
2. Zainstalowany [Docker](https://docs.docker.com/engine/install/)
3. Zainstalowana wtyczka
   [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   do Visual Studio Code

## Uruchomienie środowiska

1. Sklonuj repozytorium
   `git clone git@github.com:worotyns/recru-fullstack-mid.git`
2. Otwórz repozytorium w Visual Studio Code,
3. Zaakceptuj uruchomienie (prompt z vs code podczas otwarcia) w
   `Dev Containers` albo wybierz z menu
   `Dev Containers: Open Workspace in Container` (`ctrl/cmd + shift + p`)
4. Po poprawnym uruchomieniu DevContainer bedziesz mógł odwiedzić
   [http://localhost:8080 - app](http://localhost:8080) oraz
   [http://localhost:4000 - api](http://localhost:4000) oraz w terminalu
   będziesz działać jako user `vscode`
5. Domyślnie dev container uruchamia, serwer oraz aplikacje i robi expose portów
   `4000`, `8080` - możesz go zabić za pomocą `cmd + c`

## Dostępne komendy w CLI po uruchomieniu kontenera:

- `deno task dev` - uruchamia serwer deweloperski w trybie watch mode
- `deno task test` - uruchamia testy
- `deno task publish` - dummy task do CI/CD
- `open localhost:8080` - otwiera aplikację w przeglądarce
- `open localhost:4000` - otwiera api w przeglądarce
