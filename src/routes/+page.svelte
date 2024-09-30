<a href="/demo1">Demo 1 - piticko</a>
<script>
    let name = 'World';
    const apiKey = import.meta.env.VITE_API_KEY;

    /**
     * @type {string | null}
     */
    let error = null;

    /**
     * @type {string }
     */
    let title = 'Please click on the button to get a quote.';

    /**
     * @type {boolean}
     */
    let isLoading = false;

    const fetchQuote = async () => {
        try {
            isLoading = true;

            const response = await fetch('https://api.api-ninjas.com/v1/quotes?', {
                headers: { 'x-api-key': apiKey }
            });

            if (!response.ok) {
                error = 'An error ocurred, failed to get quotes.';
                console.log(error);
                return;
            }

            const data = await response.json();
            title = data[0].quote || 'No quote available';
        } catch (err) {
            error = 'An error ocurred, failed to get quotes.';
            console.log(error);
        } finally {
            isLoading = false;
        }
    };
</script>