const { Controller, Response } = require("pepesan");
const {postData} = require("../service/gsheet")
const f = require("../utils/Formatter");


module.exports = class BotController extends Controller {
    async introduction(request) {
      return Response.menu.fromArrayOfString(
        [
          f("menu.recordOrder"),
          f("menu.checkStock")
        ],
        f("intro", [request.name]),
        f("template.menu")
      );
    }

    async recordOrder(request) {
      return this.input(request);
    }

    async input(request) {
      const key = request.text;
      console.log(`Received key: ${key}`); // Tambahkan log ini untuk debugging
      const isAllowed = await this.checkKey(key);
      if (isAllowed) {
        await this.setState("inputIn");
        await this.reply(f("form.OrderProduct"));
        return this.reply('key is valid');
      }
      // await this.reply(f("formOrderProduct"))
      await this.reply(f("form.OrderProduct"));
      return this.setState("inputIn");
    }

    async checkKey(key){
      key === '1';
    }

    async handleInput(request) {
      const input = request.text;
      const [namaProduk, banyakBarang, metodePembayaran] = input.split('#');
      console.log()
    
      if (!namaProduk || !banyakBarang || !metodePembayaran) {
        return this.reply('Format input tidak valid. Harap masukkan data dengan format: Nama Porduk#Banyak Produk#Metode');
      }
    
      const data = {
        namaProduk,
        banyakBarang,
        metodePembayaran
      };
    
      console.log(data);

      try {
        const response = await postData(data);
        await this.reply(response);
        console.log(response);
      } catch (error) {
        await this.reply(`Terjadi kesalahan: ${error.message}`);
      }
    
      await this.setState(null); // Reset state setelah menerima input
      return this.sendBasicMenu()
    }
    

    async checkStock(request) {
      await this.reply("Stock Sisa : 5")
      await this.reply(f("footer"))
      return this.sendBasicMenu()
    }


    async sendBasicMenu(request) {
      return Response.menu.fromArrayOfObject([
        {
          value: 'menu back',
          text: f("menu.back"),
          code: "0"
        }
      ],
      "",
      f("template.menu")
      )
    }
}