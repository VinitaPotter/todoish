const _ = require("lodash");
class APIFeatures {
  constructor(Mquery, Rquery) {
    (this.query = Mquery), (this.Rquery = Rquery);
  }
  filter() {
    console.log(this.Rquery);
    let filterQuery = _.pick(this.Rquery, [
      "priority",
      "status",
      "dueDate",
      "owner",
    ]);

    const queryString = JSON.stringify(filterQuery).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  sort() {
    if (this.Rquery.sort) {
      let soryBy = this.Rquery.sort.split(",").join(" ");
      this.query = this.query.sort(soryBy);
    }
    return this;
  }

  limitFields() {
    if (this.Rquery.fields) {
      let fields = this.Rquery.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    let pageNumber = this.Rquery.page * 1 || 1;
    let pageLimit = this.Rquery.limit * 1 || 100;
    let skip = (pageNumber - 1) * pageLimit;

    this.query = this.query.skip(skip).limit(pageLimit);

    return this;
  }
}

module.exports = APIFeatures;
