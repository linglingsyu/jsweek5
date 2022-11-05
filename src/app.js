const state = {
  flag: false,
  data: [],
  async init() {
    await this.getData()
    this.setData()
  },
  async getData() {
    try {
      const response = await axios.get(
        'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'
      )
      this.data = response.data.data
      // console.log(this.data)
    } catch (error) {
      console.error(error)
    }
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
      console.log(this.data)
      this.data.forEach((item) => {
        const content = this.getDataTemplate(item)
        contentBox.insertAdjacentHTML('beforeend', content)
      })
      filterCount.innerHTML = `本次共搜尋${this.data.length}筆資料`
    }
  },
  getDataTemplate(data) {
    const { id, name, imgUrl, area, description, group, price, rate } = {
      ...data,
    }
    return `
    <li class="relative break-all basis-4/12 px-[15px]">
    <div class=" py-2 px-5 bg-[#64C3BF] text-white rounded-br rounded-tr absolute left-0 top-0 -translate-y-[15px] translate-x-[15px] z-10">${area}</div>
    <div class="flex flex-col h-full overflow-hidden bg-white rounded shadow-[0_3px_6px_1px_#00000029]">
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
    const data = {}
    let status = true
    for (const [key, value] of formData) {
      let dom = document.querySelector('#' + key)
      dom.classList.remove('border-b-red-400')
      dom.classList.add('border-b-main')
      let val = value.trim()
      if (val.length > 0 || (key === 'rate' && val > 0 && val < 10)) {
        data[key] = val
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
    if (condition === 'all') {
      this.setData()
    } else if (condition !== undefined) {
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
