<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from 'vant';
import 'vant/es/toast/style';

const typeChoice = ref("");
const yearChoice = ref<number | null>(null);
const monthChoice = ref<number | null>();
const router = useRouter();

const choiceType = (type: string) => {
  typeChoice.value = type;
};

const choiceYear = (year: number | null) => {
  yearChoice.value = year;
};

const choiceMonth = (month: number | null) => {
  monthChoice.value = month;
};

const clear = () => {
  typeChoice.value = "";
  yearChoice.value = null;
  monthChoice.value = null;
};

const emit = defineEmits(["isShow"]);

const goChoieBook = () => {
  if (typeChoice.value && typeChoice.value && monthChoice.value) {
    emit("isShow");
    router.push({
      path: "/choicebook",
      query: {
        type: typeChoice.value,
        year: yearChoice.value,
        month: monthChoice.value,
      },
    });
    console.log(typeChoice.value, yearChoice.value);
  } else {
    showToast('请勾选类型、年份或月份');
  }
};
</script>

<template>
  <div class="Popup">
    <div>筛选</div>
    <div class="choice">
      <div class="option">类型</div>
      <div class="type">
        <button @click="choiceType('magazine')" :class="typeChoice == 'magazine' ? 'button2':'button1'">杂志</button>
        <button @click="choiceType('subject')" :class="typeChoice == 'subject' ? 'button2':'button1'">单行本</button>
      </div>
      <div class="option">年份</div>
      <div class="year">
        <button v-for="(item,index) in 15" :key="index" @click="choiceYear(2022 - index)"
          :class="yearChoice == (2022 - index) ? 'choice-true':'choice-f'">{{2022 - index}}</button>
      </div>
      <div class="option">月份</div>
      <div class="month">
        <button v-for="(item,index) in 12" :key="index" @click="choiceMonth(index + 1)"
          :class="monthChoice == (index + 1) ? 'choice-true':'choice-f'">{{index + 1}}</button>
      </div>
      <div class="flex">
        <van-button type="primary" size="small" @click="goChoieBook">确定</van-button>
        <van-button @click="clear" type="default" size="small">重置</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Popup {
  width: 250px;
  height: 100vh;
  background-color: white;
  padding: 30px 11px 0 11px;

  .choice {
    padding-top: 2vh;

    .flex {
      width: 100%;
      display: flex;
      //   flex-direction: row-reverse;

      button {
        width: 70px;
        margin-left: 10px;
      }
    }

    .type {
      .button1 {
        box-sizing: border-box;
        width: 75px;
        height: 25px;
        border-radius: 50px;
        border: 0;
        margin-right: 11px;
      }

      .button2 {
        box-sizing: border-box;
        width: 73px;
        height: 25px;
        border-radius: 50px;
        border: 1px solid #0191ff;
        margin-right: 11px;
        color: #0191ff;
      }
    }

    .option {
      color: #969696;
      font-size: 14px;
      margin: 2vh 0;
    }

    .choice-f {
      box-sizing: border-box;
      width: 60px;
      height: 25px;
      line-height: 23px;
      border-radius: 50px;
      border: 0;
      margin-right: 11px;
    }

    .choice-true {
      box-sizing: border-box;
      width: 60px;
      height: 25px;
      border-radius: 50px;
      border: 1px solid #0191ff;
      margin-right: 11px;
      color: #0191ff;
    }

    .year {
      display: flex;
      flex-wrap: wrap;

      button {
        margin-bottom: 2vh;
      }
    }

    .month {
      display: flex;
      flex-wrap: wrap;

      button {
        margin-bottom: 2vh;
      }
    }
  }
}
</style>