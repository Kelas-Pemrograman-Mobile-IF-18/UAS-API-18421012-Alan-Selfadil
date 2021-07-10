const gas = require('../model/Gas.js')
const response = require('../config/response')
const ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs')
const { resolve } = require('path')

exports.inputDataGas = (data) =>
new Promise(async (resolve, reject) => {
    const pesanGas = new gas({
        kodepesanan: data.kodepesanan,
        jenisgas: data.jenisgas,
        jumlahpesanan: data.jumlahpesanan,
        alamatpenerima: data.alamatpenerima,
        atasnama: data.atasnama 
    })

    await gas.findOne({kodepesanan: data.kodepesanan})
    .then(gas => {
        if (gas){
            reject(response.commonErrorMsg('Mofon Maaf Kode Gas Sudah Ada'))
        }else{
            pesanGas.save()
                .then(r=>{
                    resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
            }).catch(err => {
                    reject(response.commonErrorMsg('Mofon Maaf Gagal Menginput Data'))
            })
        }
    }).catch(err => {
        reject(response.commonErrorMsg('Mofon Maaf Terjadi Kesalahan Pada Server'))
    })
})

exports.lihatDataGas = () =>
new Promise(async (resolve, reject) => {
    gas.find({})
    .then(result => {
        resolve(response.commonResult(result))
    })
    .catch(() => reject(response.commonErrorMsg('Mofon Maaf Terjadi Kesalahan Pada Server')))
})

exports.lihatDetailDataGas = (kodegas) =>
new Promise(async (resolve, reject) => {
    gas.findOne({kodegas: kodegas})
    .then(result => {
        resolve(response.commonResult(result))
    })
    .catch(() => reject(response.commonErrorMsg('Mofon Maaf Terjadi Kesalahan Pada Server')))
})

exports.updateGas = (id, data) =>
new Promise(async (resolve, reject) => {
    gas.updateOne(
        {_id : ObjectId(id)},
        {
            $set: {
                kodepesanan: data.kodepesanan,
                jenisgas: data.jenisgas,
                jumlahpesanan: data.jumlahpesanan,
                alamatpenerima: data.alamatpenerima,
                atasnama: data.atasnama
            }
        }
    ).then(gas => {
        resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
    }).catch(err => {
        reject(response.commonErrorMsg('Mofon Maaf Gagal Menginput Data'))
    })
})


exports.hapusgas = (_id) =>
new Promise(async (resolve, reject) => {
    await gas.remove({_id: ObjectId(_id)})
    .then(() => {
        resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
    }).catch(() => {
        reject(response.commonErrorMsg('Mofon Maaf Gagal Menghapus Data'))
    })
})