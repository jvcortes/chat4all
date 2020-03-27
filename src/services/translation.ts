
/**
 * Translation service.
 *
 * Performs text translations through a translation API.
 *
 * @param apiKey - API key for the translation API.
 * 
 * @property apiKey - API key for the translation API.
 */
export class TranslationService {

  apiKey: string

  constructor (apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Translates a string from a language to another language.
   *
   * @param text - text to translate.
   * @param origin - language in which the text is written.
   * @param destination - language used to translate the text.
   *
   * @return Promise, containing a string, the translated text if the request
   * is succesful.
   */
  async translate (text: string, origin: string, destination: string): Promise<string> {
    const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/` +
          `translate?key=${this.apiKey}&lang=${origin}-${destination}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'text=' + text
    })

    const body = await response.json()
    return body.text
  }
}
