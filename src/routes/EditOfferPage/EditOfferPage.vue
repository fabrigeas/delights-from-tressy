<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import { Offer, OfferType } from '../../types';

const baseUrl = '/api/offers';
const imagesUrl = '/api/files';

export default defineComponent({
  components: { CustomButton },
  data() {
    return {
      offer: {
        description: '',
        date: new Date(),
        image: '',
        offerType: 'food',
        price: '500',
        title: '',
        images: [],
        daysOfTheWeek: [],
      } as Offer,
      offerTypes: ['food', 'drink', 'fruit', 'salad', 'today'] as OfferType[],
      files: [] as File[],
      daysOfTheWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    };
  },
  computed: {
    mainPhoto() {
      const { id, images } = this.offer;

      if (images && images[0]) {
        return `/offers/${id}/${images[0]}`;
      }

      const file = this.files[0];

      if (file) {
        return URL.createObjectURL(file);
      }

      return undefined;
    },
    imageUrls() {
      const { files } = this;

      if (files.length) {
        return this.files.map(file => URL.createObjectURL(file));
      }

      const { images, id } = this.offer;

      return images.map(name => `/offers/${id}/${name}`);
    },
    imageEndpoint() {
      return `${imagesUrl}/${this.offer.id}`;
    },
  },
  created() {
    if (this.$route.params.id === 'new') {
      return;
    }

    axios
      .get(`${baseUrl}/${this.$route.params.id}`)
      .then(({ data }) => {
        if (data) {
          this.offer = data.offer;
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    async create() {
      const { offer, files, $router } = this;
      const promises: Promise<string>[] = [];

      try {
        await axios.post(baseUrl, offer);

        files.forEach(file => {
          promises.push(this.uploadFile(file));
          this.offer.images.push(file.name);
        });

        await Promise.all(promises);
        await this.save();

        $router.push(this.offer.id as string);
      } catch (e) {
        console.log(e);
      }
    },
    saveAndExist() {
      this.save().then(this.goBack);
    },
    save() {
      const { offer } = this;

      return axios
        .put(`${baseUrl}/${offer.id}`, offer)
        .then(({ data }) => {
          this.offer = data.offer;
        })
        .catch(e => {
          console.log(e);
        });
    },
    onImageChange(e: Event) {
      const selectedFiles = (e.target as HTMLInputElement).files;

      if (!selectedFiles) {
        return;
      }

      const {
        offer: { images, id },
        files,
      } = this;
      const promises: Promise<string>[] = [];

      Array.from(selectedFiles).forEach(file => {
        if (!images.includes(file.name)) {
          if (id) {
            promises.push(this.uploadFile(file));
          } else {
            files.push(file);
          }
        }
      });

      promises.length &&
        Promise.all(promises)
          .then(result => {
            this.offer.images = [...images, ...result];
            console.log(result);
            console.log(this.offer.images);
            this.save();
          })
          .catch(e => {
            console.log(e);
          });
    },
    uploadFile(file: File): Promise<string> {
      const formData = new FormData();

      formData.append('file', file, file.name);

      return axios
        .put(this.imageEndpoint, formData, {
          headers: {
            'Content-Type': 'image/jpeg',
            offer: this.offer.id,
          },
        })
        .then(({ data }) => data.originalFilename);
    },
    deleteFile(i: number) {
      const { files } = this;

      if (files.length) {
        files.splice(i, 1);
        return;
      }

      const { images } = this.offer;
      const filename = images.splice(i, 1).pop();

      axios
        .delete(this.imageEndpoint, {
          headers: {
            filename,
          },
        })
        .then(() => this.save());
    },
    setDefault(i: number) {
      const { files } = this;

      if (files.length) {
        [files[0], files[i]] = [files[i], files[0]];
        return;
      }

      const { images } = this.offer;

      [images[0], images[i]] = [images[i], images[0]];
      this.save();
    },
    async deleteOffer() {
      const { offer } = this;

      try {
        await axios.delete(`${baseUrl}/${offer.id}`);
        await axios.delete(imagesUrl, {
          headers: {
            offer: offer.id,
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.goBack();
      }
    },
    updateDays(day: string) {
      const { daysOfTheWeek } = this.offer;

      const i = daysOfTheWeek.findIndex(d => d === day);

      if (i > -1) {
        daysOfTheWeek.splice(i, 1);
      } else {
        daysOfTheWeek.push(day);
      }
    },
    goBack() {
      this.$router.back();
    },
  },
});
</script>

<template>
  <div class="offer-detail">
    <div class="image">
      <img v-if="mainPhoto" :src="mainPhoto" :alt="offer.title" />
      <input
        ref="imageInput"
        type="file"
        placeholder="Click to select image"
        accept="image/*"
        multiple="true"
        form="offer-form"
        :required="mainPhoto === undefined"
        :hidden="mainPhoto !== undefined"
        @change="onImageChange"
      />
    </div>
    <div class="content">
      <section class="cart-container"></section>
      <form
        id="offer-form"
        @submit.prevent="offer.id ? saveAndExist() : create()"
      >
        <div class="form-control title">
          <label>
            Title:
            <input v-model="offer.title" placeholder="Offer name" required />
          </label>
        </div>
        <div class="form-control date">
          <label>
            Date:
            <input v-model="offer.date" type="date" placeholder="Offer Date" />
          </label>
        </div>
        <div class="form-control offer-type">
          <label>
            Offer type:
            <select>
              <option
                v-for="i in offerTypes"
                :key="i"
                :value="offer.offerType"
                required
              >
                {{ i }}
              </option>
            </select>
          </label>
        </div>
        <div class="days-of-the-week">
          <label v-for="day in daysOfTheWeek" :key="day">
            {{ day }}
            <input
              type="checkbox"
              :checked="offer.daysOfTheWeek.includes(day)"
              @click="updateDays(day)"
            />
          </label>
        </div>
        <div class="form-control description">
          <label>
            Description:
            <textarea
              v-model="offer.description"
              placeholder="Offer description"
              rows="10"
            >
            </textarea>
          </label>
        </div>
        <div class="form-control price">
          <label>
            Unit price:
            <input
              v-model="offer.price"
              type="number"
              placeholder="Unit price"
              step="500"
              required
            />
          </label>
        </div>
        <div class="actions">
          <CustomButton type="button" @click="$router.back()"
            >cancel</CustomButton
          >
          <CustomButton type="submit">save</CustomButton>
        </div>
      </form>
      <CustomButton
        button-type="danger"
        class="outlined full"
        @click="deleteOffer"
        >Delete '{{ offer.title }}'</CustomButton
      >
    </div>
  </div>
  <h3>Gallery</h3>
  <hr />
  <div class="slider">
    <div class="slide image-placeholder">
      <CustomButton @click="($refs.imageInput as HTMLInputElement).click()">
        Add Image
      </CustomButton>
    </div>
    <div v-for="(img, i) in imageUrls" :key="i" class="slide">
      <figure>
        <img :src="img" />
        <CustomButton class="set-default" @click="setDefault(i)"
          >Set default</CustomButton
        >
        <span
          title="delete this photo"
          class="delete-button"
          button-type="danger"
          @click="deleteFile(i)"
          >X</span
        >
      </figure>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/global.scss';
.offer-detail {
  display: flex;
  gap: $large;
  .image {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 25rem;
    position: relative;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    div {
      margin-right: auto;
      display: flex;
    }
  }
  .content {
    flex: 2;
  }
}
div.form-control {
  margin-bottom: $large;
  text-align: start;
  font-weight: bold;
  input,
  textarea,
  select {
    padding: $medium;
    width: 100%;
    margin-top: $small;
    font-size: larger;
  }
}
.days-of-the-week {
  display: flex;
  gap: $large;
  cursor: pointer;

  & > * {
    cursor: pointer;
  }
  input {
    margin-left: $x-small;
    width: auto;
  }
}
.actions {
  display: flex;
  gap: $small;
  margin: auto;
  padding: $medium 0;
  justify-content: space-between;
  & > button {
    flex: 1;
  }
}
.slider {
  display: flex;
  flex-wrap: wrap;
  .slide {
    flex-basis: 20rem;
    border: solid;
    margin: $medium;
    &:hover {
      cursor: pointer;
      .set-default {
        display: block;
      }
    }
  }
  figure {
    height: 15rem;
    position: relative;
    display: flex;
    justify-content: center;
    img {
      height: 100%;
      width: auto;
    }
    figcaption {
      display: none;
      position: absolute;
      bottom: 0;
      width: 80%;
      margin: auto;
      & > button {
        flex: 1;
        margin: 0 $small;
      }
    }
  }
  .image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.zoomed {
  position: fixed;
  // scale: 2.5;
  z-index: 2;
}
.delete-button {
  position: absolute;
  color: red;
  right: $large;
  top: $large;
  &:hover {
    color: lighten(red, 10);
    scale: 1.5;
  }
}
.set-default {
  position: absolute;
  bottom: 0;
  display: none;
}
.full {
  width: 100%;
}
@media (max-width: $mobile) {
  h3 {
    margin: $large;
  }

  .offer-detail {
    padding: $small;
  }
  .offer-detail,
  .days-of-the-week,
  .slider {
    flex-direction: column;
  }
  .slider {
    padding: $small;
    .slide {
      flex-basis: unset;
      margin: $x-small 0;
      img {
        width: 100%;
        height: auto;
      }
    }
    .slide.image-placeholder {
      border: none !important;
      button {
        width: 100%;
      }
    }
  }
}
</style>
