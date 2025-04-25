export const list = [
  {
    "list": ```
      let url = 'https://meirentu.cc/'
      try {
        let { data } = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
          }
        })
        let $ = cheerio.load(data)
        let list = $('.cl .i_list').map((i, el) => {
          return {
            title: $(el).find('.meta-title').text().trim(),
            cover: $(el).find('img').attr('data-src'),
            href: 'https://meirentu.cc' + $(el).find('a').attr('href'),
            date: $(el).find('.meta-post span').first().text().trim(),
            desc: $(el).find('.cx_like').text().trim()
          }
        }).toArray()
        return list
      } catch (error) {
      }
    ```,
    "detail": ```
      const getData = async (url) => {
        try {
          let { data } = await axios.get(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            }
          })
          let $ = cheerio.load(data)
          let list = $('.content img').map((i, el) => {
            return $(el).attr('src')
          }).toArray()
          return list
        } catch (error) {
        }
      }
      const getDetail = async (url) => {
        try {
          let { data } = await axios.get(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            }
          })
          let $ = cheerio.load(data)
          let list = $('.page a').map((i, el) => {
            return 'https://meirentu.cc' + $(el).attr('href')
          }).toArray()
          list.pop()
          let result = []
          for (const item of list) {
            let arr = await getData(item)
            result = result.concat(arr)
          }
          return result
        } catch (error) {
        }
      }
      return getDetail("''' + url + '''")
    ```
  }
]