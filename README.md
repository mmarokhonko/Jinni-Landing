# Jinni Lotto Betting App

Look of the app is defined by two url parameters - *lottery* and *offer*. Both parameters are case-insensitive.<br>
*lottery* parameter should be equal to lottery name in feed.json and determines which lottery data to pick for various components.
Default value, if not provided, is **euromillions**<br>
*offer* parameter determines look of the picker. Default value, if not provided, is **freeticket**. The parameter should be one of the following:
1. **freeticket**
2. **freeticketv2**
3. **XforY** where X is total number of tickets, Y is number of not free tickets. For example, **4for1** <br>

### HOW TO add new lottery data
To add new lottery to the supported list following files should be modified:<br>
1. */src/tools/lottoParamsData.js* - contains packageId and incentiveCode information for various versions of lotteries - freeTicket, freeTicketV2, 4for1 etc.
2. */src/components/DynamicHeader/headerLottoData.js* - contains images and logos that are used in the header like background, mobile background, people image and lottery logo.
3. */src/components/NumberPicker/pickerLottoData.js* - contains data to determine picker look and functionality and mobile header tickets data. <br>
*max/minNumber* and *max/minBonus* are self-explanatory;<br> *numbersAmount* and *bonusAmount* determine maximum number of picked numbers and bonuses accordingly;<br>
*bonusName* - bonus name to display on picker specific for a lottery;<br>
*ballsTheme* - color theme for picker balls. Implemented values are ***blue-yellow***, ***red-yellow***, ***yellow-red***. To add new themes support, add new classes ***-theme_THEME-NAME*** in files MultiPicker.scss, NumberPickerMobile.scss and DynamicHeader.scss<br>
4. */src/components/Fact/factLottoData.js* - contains fact about lotteries to show in "Did you know" section
5. */src/components/Help/helpLottoData.js* - contains lottery-specific texts in "How to play" section. <br> 
*firstStep* - p-tag for the first step;<br>
*desktop* - p-tag for the third step with timer on desktop;<br>
*mobile* - p-tag for the third step with timer on mobile.

### HOW TO add support for new versions of the "offer" url-parameter
The multipicker takes number of tickets directly from the parameter, so only thing to add is new packageId and incentiveCode values in */src/tools/lottoParamsData.js* file.

### HOW TO add new localisation
To add support for new languages you should take next steps:
1. Add new text json to *src/localisation* folder. New file should exactly follow the structure of already existing files, all tags and templates (for example, {{*slotName*}}) should be preserved and not translated.
2. In *src/tools/i18nextSetup.js* add new translation to i18n config object, using existing ones as example.
3. If you need currency sing to appear before jackpot number in header, modify *isCurrSignBefore* related checks in files *src/components/DynamicHeader/DynamicMobileHeader.js* and *src/components/DynamicHeader/jackpotTools.js*

### HOW TO apply changes.
Rebuild the app with _npm run build_ command and copy */dist* folder contents to the hosting. 

### npm scripts
- _npm start_ - start Webpack Dev Server on port 9000.
- _npm run build_ - builds main.js and styles.css for production.
- _npm run analyse_ - builds main.js and styles.css for production with enabled Webpack Bundle Analyzer.