
const txtItems = (item) => {
    const allItems = {
        name: {
            pl: 'Chess With Chat',
            en: 'Chess With Chat',
        },
        loginDesc: {
            pl: 'Platforma dzięki, której jesteś w stanie zagrać w szachy sam przeciwko tysiącom widzów. Wystarczy, że się zalogujesz, dostosujesz ustawienia i możesz rozpocząć gre przeciwko swoim widzom.',
            en: 'A platform thanks to which you are able to play chess against thousands of spectators. All you have to do is log in, adjust the settings and you can start playing against your viewers.',
        },
        cookiesDesc: {
            pl: 'Zmieniamy się na lepsze - ta strona korzysta z plików cookies w celu rozwijania doświdczeń użytkownika. Akceptując zgode pozwalasz nam oraz naszym partnerom zbierać informacje dotyczące twoich wizyt na naszej stronie. Pliki cookies są niezbędne do działania Chess With Chat.',
            en: `We're changing for the better - this site uses cookies to improve user experience. By accepting this consent, you allow us and our partners to collect information about your visits to our site. Cookies are necessary for the Chess With Chat to work correctly.`,
        },
        undestand: {
            pl: 'Rozumiem',
            en: 'I undestand',
        },
        wantToKnowMore: {
            pl: 'Chce się dowiedzieć więcej',
            en: 'I want to read policies',    
        },
        logIn: {
            pl: 'Zaloguj się kontem Twitch',
            en: 'Log in with your Twitch account',
        },
        tableOfContent: {
            pl: 'Spis treści',
            en: 'Table of content'
        },
        loading: {
            pl: 'Ładowanie...',
            en: 'Loading...'
        },
        error: {
            pl: 'Wystąpił błąd',
            en: 'An error occurred'
        },
        hello: {
            pl: 'Witaj,',
            en: 'Hello,'
        },
        whiteListAsk: {
            pl: 'Poproś o dostęp do gry',
            en: 'Request access to the game'
        },
        whiteListProcessing: {
            pl: 'Twoja prośba o dostęp jest procesowana',
            en: 'Your access request is being processed'
        },
        whiteListDenied: {
            pl: 'Twoja prośba o dostęp została odrzucona',
            en: 'Your request for access has been denied'
        },
        start: {
            pl: 'Rozpocznij',
            en: 'Start the game'
        },
        enterNick: {
            pl: 'wpisz swój nick',
            en: 'enter your nickname'
        },
        pleaseEnterNick: {
            pl: 'Najpierw wpisz swój nick do lichess',
            en: 'First enter your lichess nickname'
        },
        noFreeBots: {
            pl: "Brak wolnych botów, odczekaj chwile i odśwież",
            en: "No free bots, wait for a while and refresh",
        },
        intructionTitle: {
            pl: "Wybierz interesujący cię tryb oraz dostosuj ustawienia. ",
            en: "Select game mode you are interested in and adjust the settings. ",
        },
        instructionDesc: {
            pl: `Po kliknięciu "Rozpocznij" otworzą się 2 nowe karty. Pierwszą z nich będzie lichess.org z zaproszeniem do gry a w drugiej znajdziesz podgląd pokazujący status aktualnej gry. Aktualnie dostępne są 2 tryby gry:`,
            en: `When you click "Start the game", 2 new tabs will open. The first one will be lichess.org with an invitation to play and in the second one you will find a preview showing the status of the current game. There are currently 2 game modes available:`,
        },
        instruction1vC: {
            pl: " - Gra, w której bot wykonuje ruch, który uzyskał największą ilość głosów czatu.",
            en: " - A game in which a bot makes a move that has received the most chat votes.",
        },
        instructionPresident: {
            pl: " - Tryb, w którym wybierany jest jeden przedstawiciel czatu, którymi swoimi ruchami musi zadowolić swoich wyborców bo inaczej zostanie zmieniony.",
            en: " - A mode in which one chat representative is drawn, with whose moves he must satisfy chat because otherwise he will be changed.",
        },
        instructionQuestions: {
            pl: "W razie pytań zachęcam do kontaktu przez Discord: widarek",
            en: "If you have any questions, feel free to contact me via Discord: widarek",
        },
        reloadPreview: {
            pl: "odśwież podgląd",
            en: "reload preview",
        },
        gameStopped: {
            pl: "Gra została zakończona",
            en: "The game has been stopped",
        },
        gameConnected: {
            pl: "Bot połączony z podglądem ",
            en: "Bot is connected to preview",
        },
        lastMove: {
            pl: "Ostatni ruch: ",
            en: "Last move: ",
        },
        firstRound: {
            pl: "To jest 1 runda ",
            en: "This is first round ",
        },
        streamerMove: {
            pl: "Ruch Streamera",
            en: "Streamer's turn",
        },
        presidentMove: {
            pl: "Ruch prezydenta",
            en: "President's turn",
        },
        chatMove: {
            pl: "Ruch czatu",
            en: "Chat's turn",
        },
        chatMoveDesc: {
            pl: "Napisz na czacie jeden z dozwolonych ruchów",
            en: "Write in chat one of the allowed moves",
        },
        satisfactionSurvey: {
            pl: "Czy prezydent ma zostać?",
            en: "Should the president stay?",
        },
        satisfactionSurveyDesc: {
            pl: "Napisz na czacie tak lub nie",
            en: "Write in chat yes or no",
        },
        election: {
            pl: "Trwają wybory",
            en: "It's election time",
        },
        electionDesc: {
            pl: "Aby zgłosić się do gry napisz !zapis",
            en: "To apply for the game write !enroll",
        },
        enrolled: {
            pl: " zapisanych",
            en: " enrolled",
        },
        validMoves: {
            pl: "Możliwe ruchy:",
            en: "Valid moves:",
        },
        colorOfPieces: {
            pl: "Bierki czatu:",
            en: "Chat pieces:",
        },
        random: {
            pl: "Losowe",
            en: "Random",
        },
        white: {
            pl: "Białe",
            en: "White",
        },
        black: {
            pl: "Czarne",
            en: "Black",
        },
        gameType: {
            pl: "Tryb gry:",
            en: "Game mode:", 
        },
        streamerVsChat: {
            pl: "1vsChat",
            en: "1vsChat", 
        },
        presidentGame: {
            pl: "Prezydent",
            en: "President", 
        },
        gameDuration: {
            pl: "Czas strony:",
            en: "Time for side: ", 
        },
        chatTime: {
            pl: "Czas czatu:",
            en: "Chat vote:", 
        },
        electionTime: {
            pl: "Czas wyborów:",
            en: "Election time:", 
        },
        presidentTime: {
            pl: "Czas prezydenta:",
            en: "President's vote:", 
        },
        wrongAction: {
            pl: "nieprawidłowy typ akcji",
            en: "undefined action", 
        },
        
    }
    
    let currentLang = "en"

    if (/^pl\b/.test(navigator.language)) {
        currentLang = "pl"
    }

    if(typeof(allItems[item][currentLang]) !== undefined){
        return allItems[item][currentLang]
    }else{
        return ""
    }
    
}

export default txtItems