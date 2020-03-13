# THE MAIN FUNCTION
def main():
    # example list for testing
    fruit = ['peer', 'sinasappel', 'banaan', 'kiwi', 'appel', 'Aardbei', 'Meloen', 'perzik', 'framboos', 'Granaatappel', 'appelmoes', 'Abrikoos', 'ananas', 'braam', 'bes', 'kers', 'nectarine']

    # defining the search function
    def search(request):
        # list to contain all search results
        result = []
        # loop through each item inside the example list
        for item in fruit:
            # function for sorting the results in the right order
            def bestResult(resultSort):
                # returns an int value depending on the part of the string that resembles the search request
                # the lower the number, the higher the priority
                num = resultSort.lower().find(request.lower())
                return num
            # if an item from the example list contains a part of the search request (all lower case)
            if request.lower() in item.lower():
                # put the found results into the result list
                result.append(item)
            # if the statement above returns false, check te opposite
            elif item.lower() in request.lower():
                # put the found results into the result list
                result.append(item)
        # if nothing is found
        if len(result) == 0:
            # show this message
            return 'Geen resultaten gevonden.'
        # if something is found
        else:
            # sort the list according to the function we defined above and return its value
            return sorted(result, key=bestResult, reverse=False)
    # requests user input
    userInput = input('Zoek: ')
    # show the results on the screen
    print(search(userInput))
    # run the function again
    main()
# call the main function
main()
