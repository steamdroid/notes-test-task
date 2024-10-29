<template>
  <section class="start-screen">
    <div class="container start-screen__container">
      <div class="start-screen__info">
        <h1 class="start-screen__info-title">Мои заметки</h1>
        <p class="start-screen__info-description">
          Не&nbsp;забывай о&nbsp;важном, храни его в&nbsp;облаке.
        </p>
      </div>
      <div class="start-screen__image">
        <img src="@/assets/images/start.svg" alt="Доска с заметками" />
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.start-screen {
  @include md {
    padding-top: 40px;
  }

  @include sm {
    padding-top: 20px;
  }
}

.start-screen__container {
  display: flex;
  flex-direction: row;

  @include md {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.start-screen__info {
  margin: auto 0;

  @include md {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.start-screen__info-title {
  @include h1;
  margin-bottom: 40px;

  @include md {
    margin-bottom: 20px;
  }

  @include sm {
    @include h1-sm;
    max-width: 320px;
  }
}

.start-screen__info-description {
  @include h3;
  color: $c-gray;
  max-width: 394px;

  @include md {
    max-width: 100%;
  }

  @include sm {
    margin-bottom: 16px;
  }
}

.start-screen__image {
  max-width: 898px;

  @include lg {
    max-width: 627px;
  }

  @include md {
    max-width: 560px;
  }
}
</style>
