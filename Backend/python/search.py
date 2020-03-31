
while True:
    # example list for testing this should be the list of things youre searching through, such as all kenniskaarten
    fruit = ['peer', 'sinasappel', 'banaan', 'kiwi', 'appel', 'Aardbei', 'Meloen', 'perzik', 'framboos', 'Granaatappel', 'appelmoes', 'Abrikoos', 'ananas', 'braam', 'bes', 'kers', 'nectarine']
    def search(request):
        """Vind alle kenniskaarten die overeenkomen met de search querry, 'ba' vind banaan terwijl """
        results = []
        # loop through each item inside the example list
        for item in fruit:
            def bestResult(resultSort):
                """sorteert alle resulateten op eerst voorkomend, stel je zoekt 'an' dan vind je ananas eerder dan banaan.
                Let er op dat je ook banaan vind ondanks dat er geen 'd' in de search querry zit."""
                # returns an int value depending on the part of the string that resembles the search request
                # the lower the number, the higher the priority
                num = resultSort.lower().find(request.lower())
                return num
            # if an item from the example list contains a part of the search request (all lower case)
            if request.lower() in item.lower():
                results.append(item)
            # if the statement above returns false, check the opposite
            elif item.lower() in request.lower():
                results.append(item)
        if len(results) == 0:# if nothing is found
            return 'Geen resultaten gevonden.'
        else:# if something is found
            # sort the list according to the function bestResult() and return its value
            return sorted(results, key=bestResult, reverse=False)


    userInput = input('Zoek: ')
    print(search(userInput))