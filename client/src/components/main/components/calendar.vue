<template>
  <div>
    <div class="text-black text-2xl font-medium flex justify-around mt-8 align-baseline">
      <span class="mt-2 cursor-pointer" @click="prevMonth()">
        <icon icon="chevron-left" />
      </span>

      <p>{{new Date(year, month, today ).toLocaleString('default', {day: '2-digit', month: 'long', year:'numeric'})}}</p>
      <span class="mt-2 cursor-pointer" @click="nextMonth()">
        <icon icon="chevron-right" />
      </span>
    </div>

    <div class="text-xl flex text-black w-full justify-evenly mt-10">
      <p v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" :key="day">{{day}}</p>
    </div>
    <div class="text-xl flex text-black w-full justify-left my-10 flex-wrap pl-16 text-left">
      <p v-for="date in offset" :key="date + 40 " style="width:14%" class="h-16">
        <span class="p-2 rounded-full inline-block w-12 text-center"></span>
      </p>
      <p
        v-for="date in numberOfDays"
        :key="date"
        style="width:14%"
        class="h-16"
        @click="goToDate(date)"
      >
        <span
          class="hover:bg-gray-700 hover:text-white p-2 rounded-full cursor-pointer inline-block w-12 text-center"
          :class="[[today == date ? 'bg-red-400' : null], [selectedDate == date && selectedMonth == month &&  selectedYear == year ? 'bg-pink-200' : null]]"
        >{{date}}</span>
      </p>
    </div>
    <p
      v-if="selectedDate"
      @click="updateSelection"
      class="cursor-pointer font-light inline mt-16 ml-16 border py-2 px-3 rounded-md hover:bg-red-400 text-black hover:text-white hover:font-semibold hover:shadow-md"
    >Clear filter</p>

    <div class="fixed bottom-0 bg-white z-50 text-gray-600">
      <p>
        This project was created to learn and understand
        <img
          class="inline h-4 w-8"
          title="NodeJs"
          src="../../../assets/icons/nodejs.svg"
          alt
        />
        <img
          class="inline h-4 w-8"
          title="TypeScript"
          src="../../../assets/icons/typescript.svg"
          alt
        />
        <img
          class="inline h-4 w-4"
          title="Tailwindcss"
          src="../../../assets/icons/tailwindcss.svg"
          alt
        /> with the help of
        <a
          class="text-blue-500"
          href="https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/"
          target="_blank"
        >this</a>
        course by Jonas Schmedtmann for the backend part of it.
        The source code for this can be found
        <a
          class="text-blue-500"
          href="https://github.com/vinitaPotter/todoish"
        >here</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      today: new Date().getDate(),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      selectedDate: null,
      selectedMonth: null,
      selectedYear: null
    };
  },

  computed: {
    offset() {
      const offset = new Date(this.year, this.month, 1).getDay() - 1;
      return offset > 0 ? offset : [];
    },

    numberOfDays() {
      return new Date(this.year, this.month + 1, 0).getDate();
    }
  },

  methods: {
    nextMonth() {
      this.month = this.month + 1;
    },
    prevMonth() {
      this.month = this.month - 1;
    },
    goToDate(number) {
      const date = new Date(this.year, this.month, number);
      this.selectedDate = new Date(date).getDate();
      this.selectedMonth = new Date(date).getMonth();
      this.selectedYear = new Date(date).getFullYear();
      this.$emit("selected", date);
    },
    updateSelection() {
      this.selectedDate = null;
      this.selectedMonth = null;
      this.selectedYear = null;
      this.$emit("selected", null);
    }
  }
};
</script>