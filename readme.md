Chess With Chat to projekt stworzony z myślą utrwalenia wiedzy oraz rozbudowie portfolio. Pozwala on na granie w szachy wraz ze swoim czatem w dwóch dedykowanych trybach. Jeśli masz jakieś propozycje na rozwój aplikacji lub widzisz jakieś błędy feel free żeby mi je przekazać chociażby na discordzie gdzie znajdziesz mnie pod nicknamem widarek lub mailowo mikolajlewicki00@gmail.com. 

Jeśli chcesz utworzyć własną instancję tej aplikacji pamiętaj aby utworzyć odpowiednie systemowe zmienne: 

Client: 
REACT_APP_API_URL = link do serwera 
REACT_APP_PRODUCTION = status pracy nad projektem. W przypadku produkcji wpisz true
REACT_APP_GA = kod śledzenia google analytics
REACT_APP_TWITCH_URL = link do OAUTH2 skonfigurowany zgodnie z dokumentacją twitch.tv

Server:
CONNECTION_URL = link do połączenia się z mongodb
PORT = port - domyślnie jest to 5010
PRODUCTION = status pracy nad projektem. W przypadku produkcji wpisz true
TWITCH_ID = twitch id służący do prac z api Twitch.tv pozyskany zgodnie z dokumentacją tego serwisu
TWITCH_SECRET = twitch secret również pozyskany zgodnie z dokumentacją twitch.tv
MAIL_USER = mail z którego będzie wysyłana wiadomość pozwalająca na zarządzanie whitelistą
MAIL_PASSWORD = hasło do powyższego maila
MAIL_HOST = host powyższego maila
MAIL_TO = do kogo ma zostać wysłana powyższa wiadomość 
WEBSITE_LINK = link do strony z frontendem