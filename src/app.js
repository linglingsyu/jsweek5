const state = {
  data: [
    {
      id: 0,
      name: '肥宅心碎賞櫻3日',
      imgUrl:
        'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
      area: '高雄',
      description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
      group: 87,
      price: 1400,
      rate: 10,
    },
    {
      id: 1,
      name: '貓空纜車雙程票',
      imgUrl:
        'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      area: '台北',
      description:
        '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
      group: 99,
      price: 240,
      rate: 2,
    },
    {
      id: 2,
      name: '台中谷關溫泉會1日',
      imgUrl:
        'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      area: '台中',
      description:
        '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
      group: 20,
      price: 1765,
      rate: 7,
    },
  ],
  flag: false,
  init() {
    this.setData()
  },
  setData(filterResult = false) {
    const contentBox = document.querySelector('#contentBox')
    const filterCount = document.querySelector('#filterCount')
    contentBox.innerHTML = ''
    filterCount.innerHTML = ''
    if (filterResult) {
      filterResult.forEach((item) => {
        const content = this.getDataTemplate(item)
        contentBox.insertAdjacentHTML('beforeend', content)
      })
      filterCount.innerHTML = `本次共搜尋${filterResult.length}筆資料`
    } else {
      this.data.forEach((item) => {
        const content = this.getDataTemplate(item)
        contentBox.insertAdjacentHTML('beforeend', content)
      })
    }
  },
  getDataTemplate(data) {
    const { id, name, imgUrl, area, description, group, price, rate } = {
      ...data,
    }
    return `
    <li class="relative break-all basis-4/12 px-[15px]">
    <div class=" py-2 px-5 bg-[#64C3BF] text-white rounded-br rounded-tr absolute left-0 top-0 -translate-y-[15px] translate-x-[15px] z-10">${area}</div>
    <div class="flex flex-col h-full overflow-hidden  rounded shadow-[0_3px_6px_1px_#00000029]">
      <a href="#">
      <img class="w-full h-[180px] object-cover ease-in duration-200 hover:scale-105 " src="${imgUrl}" alt="travel_${id}"></a>
      <div class="flex-grow flex flex-col relative p-5">
        <h2 class=" pb-1 mb-4 border-b-2 border-b-[#007572]"><a href="#" class="text-main ease-in duration-200 font-medium text-2xl leading-[33px] hover:text-secondary">${name}</a></h2>
        <div class="flex-grow flex flex-col justify-between">
          <p class="flex-grow text-[#818A91] leading-6 mb-[22px]">${description}</p>
          <div class="min-h-[43px] flex justify-between items-center text-main leading-[22px] font-medium">
            <div class="flex items-center">
              <span class="material-icons text-[20px] mr-1">error</span>
              <span class="">剩下最後 ${group} 組</span>
            </div>
            <div class="flex items-center">
              <span class="mr-1">TWD</span>
              <span class="text-[32px] leading-[43px]">$${price}</span>
            </div>
          </div>
        </div>
        <div class="py-1 px-2 bg-main text-white rounded-br rounded-tr absolute top-0 left-0 -translate-y-1/2">${rate}</div>
      </div>
    </div>
  </li>
    `
  },
  addData(data) {
    if (Object.keys.length > 0) {
      data.id = this.data.at(-1).id + 1
      this.data.push(data)
    }
  },
  addFormData() {
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    // console.log(formData)
    const data = {}
    let status = true
    for (const [key, value] of formData) {
      let dom = document.querySelector('#' + key)
      dom.classList.remove('border-b-red-400')
      dom.classList.add('border-b-main')
      if (value || (key === 'rate' && value > 0 && value < 10)) {
        data[key] = value
      } else {
        dom.classList.remove('border-b-main')
        dom.classList.add('border-b-red-400')
        status = false
      }
    }
    if (status && Object.keys(data).length === 7) {
      state.addData(data)
      state.setData()
      form.reset()
    }
  },
  filterData(condition) {
    console.log(this)
    if (condition !== undefined) {
      const result = this.data.filter((item) => item.area === condition)
      this.setData(result)
    }
  },
  checkDescLength(content) {
    return content.length > 100 ? content.substring(0, 100) : content
  },
}

state.init()
document.querySelector('#form').addEventListener('submit', function (e) {
  e.preventDefault()
  state.addFormData()
})

document.querySelector('#filterArea').addEventListener('change', function () {
  state.filterData(this.value)
})

const descDOM = document.querySelector('#description')
descDOM.addEventListener('compositionstart', function () {
  state.flag = false
})
descDOM.addEventListener('compositionend', function () {
  state.flag = true
})
descDOM.addEventListener('keyup', function () {
  if (state.flag) {
    descDOM.value = state.checkDescLength(this.value)
  }
})
descDOM.addEventListener('input', function () {
  descDOM.value = state.checkDescLength(this.value)
})
