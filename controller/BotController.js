const { Controller, Response } = require("pepesan");
const {postData,getData} = require("../service/gsheet")
const f = require("../utils/Formatter");


module.exports = class BotController extends Controller {

  //Introduction Menu
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

      try {
        const response = await postData(data);
        await this.reply(response);
        console.log(response);
      } catch (error) {
        await this.reply(`Terjadi kesalahan: ${error.message}`);
      }
    
      await this.setState(null); 
      return this.sendBasicMenu()
    }
    

    async checkStock(request) {
      return this.getStock(request);
    }


    async getStock(request) {
      const key = request.text;
      console.log(`Received key: ${key}`); 
      const isAllowed = await this.checkGetKey(key);
      if (isAllowed) {
        await this.setState("inputIn");
        await this.reply('Mengambil Data ke Server, Mohon Tunggu!')
        return this.reply('key is valid');
      }
      await this.reply('Mengambil Data ke Server, Mohon Tunggu!')
      return this.setState("getIn");
    }

    async checkGetKey(key){
      key === '2';
    }

    async displayStock(request) {
      try{
        const response = await getData();
        const stock = response.stok;
        await this.reply(`Stock Barang Ada : ${stock[0][0]}`);
        console.log(response);
      }catch(error){
        await this.reply(`Terjadi kesalahan: ${error.message}`);
      }
      await this.setState(null); 
      return this.sendBasicMenu();
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