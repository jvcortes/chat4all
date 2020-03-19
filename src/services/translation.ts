
export class TranslationService {

  apiKey: string

  constructor (apiKey: string) {
    this.apiKey = apiKey;
  }

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
