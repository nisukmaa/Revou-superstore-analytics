// Manipulasi Data JSON
document.addEventListener("DOMContentLoaded", function () {
  let isRegionView = true;

  fetch("./data_set/superstor_dataset.json")
    .then((response) => response.json())
    .then((data) => {
      const qty = data.map((item) => item.Quantity);
      const sales = data.map((item) => item.Sales);
      const profit = data.map((item) => item.Profit);

      // Menghitung total quantity
      const totalQuantity = Math.floor(
        qty.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      ).toLocaleString();
      document.querySelector(".p-result.quantity").innerHTML = totalQuantity;

      // Menghitung total Sales
      const totalSales = Math.floor(
        sales.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      ).toLocaleString();
      document.querySelector(".p-result.sales").innerHTML = totalSales;

      // Menghitung total Profit
      const totalProfit = Math.floor(
        profit.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      ).toLocaleString();
      document.querySelector(".p-result.profit").innerHTML = totalProfit;

      // Menghitung total Order
      const uniqueOrderIds = {};
      data.forEach((item) => {
        const orderId = item["Order ID"];
        if (!uniqueOrderIds[orderId]) {
          uniqueOrderIds[orderId] = true;
        }
      });
      const totalUniqueOrders = Object.keys(uniqueOrderIds).length;
      document.querySelector(".p-result.order").innerHTML =
        totalUniqueOrders.toLocaleString();

      // Mendapatkan Tahun pada Order Date
      const uniqueYears = new Set();
      data.forEach((item) => {
        const orderDate = item["Order Date"];
        const year = orderDate.split("/")[2];
        uniqueYears.add(year);
      });
      const uniqueYearsArray = Array.from(uniqueYears).sort();
      const listItemsyears = document.querySelector(".year .list-items");
      listItemsyears.innerHTML = "";
      uniqueYearsArray.forEach((year) => {
        const listItem = document.createElement("li");
        listItem.className = "item";
        listItem.innerHTML = `
          <label>
            <input type="checkbox" name="years" value="${year}" checked /> ${year}
          </label>
        `;
        listItemsyears.appendChild(listItem);
      });

      document.querySelectorAll('.select-btn').forEach(button => {
        button.addEventListener('click', () => {
            const list = button.nextElementSibling;
            list.classList.toggle('expanded');
        });
    });
    
    document.querySelectorAll('.select-btn2').forEach(button => {
        button.addEventListener('click', () => {
            const list = button.nextElementSibling;
            list.classList.toggle('expanded');
        });
    });

      // Mendapatkan Region
      const uniqueRegions = new Set();
      data.forEach((item) => {
        const region = item["Region"];
        uniqueRegions.add(region);
      });
      const uniqueRegionsArray = Array.from(uniqueRegions).sort();
      const listItemsregion = document.querySelector(".region .list-items");
      listItemsregion.innerHTML = "";
      uniqueRegionsArray.forEach((region) => {
        const listItem = document.createElement("li");
        listItem.className = "item";
        listItem.innerHTML = `
          <label>
            <input type="checkbox" name="regions" value="${region}" checked /> ${region}
          </label>
        `;
        listItemsregion.appendChild(listItem);
      });

      function getMonthName(month) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return monthNames[month - 1];
      }

      // Fungsi untuk mengubah format tanggal ke bulan dan tahun
      function formatDateToMonthYear(date) {
        const [day, month, year] = date.split("/");
        return `${getMonthName(Number(month))} ${year}`;
      }

      // Fungsi untuk membuat objek Date dari string bulan/tahun
      function getDateFromMonthYear(monthYear) {
        const [monthName, year] = monthYear.split(" ");
        const month = new Date(`${monthName} 1, ${year}`).getMonth();
        return new Date(year, month);
      }

      // Fungsi untuk mendapatkan data yang difilter berdasarkan tahun dan region yang dipilih
      function getFilteredData() {
        const selectedYears = Array.from(
          document.querySelectorAll("input[name='years']:checked")
        ).map((checkbox) => checkbox.value);
        const selectedRegions = Array.from(
          document.querySelectorAll("input[name='regions']:checked")
        ).map((checkbox) => checkbox.value);

        const filteredData = data.filter((item) => {
          const orderDate = item["Order Date"];
          const year = orderDate.split("/")[2];
          const region = item["Region"];
          return (
            selectedYears.includes(year) && selectedRegions.includes(region)
          );
        });

        // Update total quantity, sales, profit, and order based on filtered data
        const filteredQty = filteredData.map((item) => item.Quantity);
        const filteredSales = filteredData.map((item) => item.Sales);
        const filteredProfit = filteredData.map((item) => item.Profit);

        const totalFilteredQuantity = Math.floor(
          filteredQty.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
        ).toLocaleString();
        document.querySelector(".p-result.quantity").innerHTML =
          totalFilteredQuantity;

        const totalFilteredSales = Math.floor(
          filteredSales.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
        ).toLocaleString();
        document.querySelector(".p-result.sales").innerHTML =
          totalFilteredSales;

        const totalFilteredProfit = Math.floor(
          filteredProfit.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
        ).toLocaleString();
        document.querySelector(".p-result.profit").innerHTML =
          totalFilteredProfit;

        const uniqueFilteredOrderIds = {};
        filteredData.forEach((item) => {
          const orderId = item["Order ID"];
          if (!uniqueFilteredOrderIds[orderId]) {
            uniqueFilteredOrderIds[orderId] = true;
          }
        });
        const totalFilteredUniqueOrders = Object.keys(
          uniqueFilteredOrderIds
        ).length;
        document.querySelector(".p-result.order").innerHTML =
          totalFilteredUniqueOrders.toLocaleString();
      }

      function getFiltered() {
        const selectedYears = Array.from(
          document.querySelectorAll("input[name='years']:checked")
        ).map((checkbox) => checkbox.value);
        const selectedRegions = Array.from(
          document.querySelectorAll("input[name='regions']:checked")
        ).map((checkbox) => checkbox.value);

        console.log("Selected Years: ", selectedYears);
        console.log("Selected Regions: ", selectedRegions);

        return data.filter((item) => {
          const orderDate = item["Order Date"];
          const year = orderDate.split("/")[2];
          const region = item["Region"];
          return (
            selectedYears.includes(year) && selectedRegions.includes(region)
          );
        });
      }

      // Fungsi untuk memperbarui semua chart dan tabel
      function updateAll() {
        updateChart1();
        updateChart2();
        updateChart3();
        updateChart4();
        updateChart5();
        updateChart6();
        getFilteredData();
      }

      // Fungsi untuk memperbarui chart 1
      function updateChart1() {
        const filteredData = getFiltered();
        const salesData = {};
        const profitData = {};

        filteredData.forEach((item) => {
          const monthYear = formatDateToMonthYear(item["Order Date"]);
          if (!salesData[monthYear]) {
            salesData[monthYear] = 0;
            profitData[monthYear] = 0;
          }
          salesData[monthYear] += item.Sales;
          profitData[monthYear] += item.Profit;
        });

        const monthYears = Object.keys(salesData).sort((a, b) => {
          return getDateFromMonthYear(a) - getDateFromMonthYear(b);
        });

        const sale = monthYears.map((monthYear) => salesData[monthYear]);
        const profits = monthYears.map((monthYear) => profitData[monthYear]);

        myChart.data.labels = monthYears;
        myChart.data.datasets[0].data = sale;
        myChart.data.datasets[1].data = profits;
        myChart.update();
      }

      // Fungsi untuk memperbarui chart 2
      function updateChart2() {
        const filteredData = getFiltered();

        var groupedData = {};
        filteredData.forEach(function (item) {
          var key = isRegionView ? item["Region"] : item["State"];
          var sales = item["Sales"];
          var orderId = item["Order ID"];

          if (!groupedData[key]) {
            groupedData[key] = {
              "Total Sales": 0,
              "Total Orders": new Set(),
            };
          }
          groupedData[key]["Total Sales"] += sales;
          groupedData[key]["Total Orders"].add(orderId);
        });

        var dataArray = [];
        for (var key in groupedData) {
          if (groupedData.hasOwnProperty(key)) {
            dataArray.push({
              "Region/State": key,
              "Total Sales": groupedData[key]["Total Sales"].toLocaleString(
                "en-US",
                { minimumFractionDigits: 1, maximumFractionDigits: 1 }
              ),
              "Total Orders":
                groupedData[key]["Total Orders"].size.toLocaleString(),
            });
          }
        }

        const table = $("#sales-region").DataTable();
        table.clear();
        table.rows.add(dataArray);
        table.draw();
      }

      document
        .getElementById("switch-icon")
        .addEventListener("click", function () {
          isRegionView = !isRegionView; // Toggle status tampilan
          updateChart2(); // Perbarui tabel berdasarkan tampilan baru

          // Ubah ikon sesuai status tampilan
          this.textContent = isRegionView ? "switch_right" : "switch_left";
        });

      // Fungsi untuk memperbarui chart 3
      function updateChart3() {
        const filteredData = getFiltered();

        var groupedData = {};
        filteredData.forEach(function (item) {
          var key = item["Sub-Category"];
          if (!groupedData[key]) {
            groupedData[key] = {
              Category: item["Category"],
              "Sub-Category": item["Sub-Category"],
              "Total Sales": item["Sales"],
              "Total Quantity": item["Quantity"],
            };
          } else {
            groupedData[key]["Total Sales"] += item["Sales"];
            groupedData[key]["Total Quantity"] += item["Quantity"];
          }
        });

        var dataArray = [];
        for (var subCategory in groupedData) {
          if (groupedData.hasOwnProperty(subCategory)) {
            var subCategoryData = groupedData[subCategory];
            dataArray.push({
              Category: subCategoryData["Category"],
              "Sub-Category": subCategoryData["Sub-Category"],
              "Total Sales": subCategoryData["Total Sales"].toLocaleString(
                "en-US",
                { minimumFractionDigits: 1, maximumFractionDigits: 1 }
              ),
              "Total Quantity":
                subCategoryData["Total Quantity"].toLocaleString(),
            });
          }
        }

        const table = $("#sales-category").DataTable();
        table.clear();
        table.rows.add(dataArray);
        table.draw();
      }

      // Fungsi untuk memperbarui chart 4
      function updateChart4() {
        const filteredData = getFiltered();

        const saleData = {};
        const discountCountData = {};

        filteredData.forEach((item) => {
          const monthYear = formatDateToMonthYear(item["Order Date"]);
          if (!saleData[monthYear]) {
            saleData[monthYear] = 0;
          }
          saleData[monthYear] += item.Sales;

          if (item.Discount > 0) {
            if (!discountCountData[monthYear]) {
              discountCountData[monthYear] = 0;
            }
            discountCountData[monthYear] += 1;
          }
        });

        const monthYears = Object.keys(saleData).sort((a, b) => {
          return getDateFromMonthYear(a) - getDateFromMonthYear(b);
        });

        const salesChartData = monthYears.map(
          (monthYear) => saleData[monthYear]
        );
        const discountChartData = monthYears.map(
          (monthYear) => discountCountData[monthYear] || 0
        );

        mixedChart.data.labels = monthYears;
        mixedChart.data.datasets[0].data = salesChartData;
        mixedChart.data.datasets[1].data = discountChartData;
        mixedChart.update();
      }

      // Fungsi untuk memperbarui chart 5
      function updateChart5() {
        const filteredData = getFiltered();

        const segmentCounts = {};
        filteredData.forEach((entry) => {
          const segment = entry.Segment;
          if (!segmentCounts[segment]) {
            segmentCounts[segment] = new Set();
          }
          segmentCounts[segment].add(entry["Customer ID"]);
        });

        const segmentLabels = Object.keys(segmentCounts);
        const segmentData = segmentLabels.map(
          (segment) => segmentCounts[segment].size
        );

        segmentPieChart.data.labels = segmentLabels;
        segmentPieChart.data.datasets[0].data = segmentData;
        segmentPieChart.update();
      }

      // Fungsi untuk memperbarui chart 6
      function updateChart6() {
        const filteredData = getFiltered();

        var groupedData = {};
        filteredData.forEach(function (item) {
          var region = item["Region"];
          var shipMode = item["Ship Mode"];
          var customerId = item["Customer ID"];

          if (!groupedData[region]) {
            groupedData[region] = {
              "Standard Class": new Set(),
              "Second Class": new Set(),
              "First Class": new Set(),
              "Same Day": new Set(),
            };
          }
          groupedData[region][shipMode].add(customerId);
        });

        var dataArray = [];
        for (var region in groupedData) {
          if (groupedData.hasOwnProperty(region)) {
            dataArray.push({
              Region: region,
              "Standard Class": groupedData[region][
                "Standard Class"
              ].size.toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }),
              "Second Class": groupedData[region][
                "Second Class"
              ].size.toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }),
              "First Class": groupedData[region][
                "First Class"
              ].size.toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }),
              "Same Day": groupedData[region]["Same Day"].size.toLocaleString(
                "en-US",
                { minimumFractionDigits: 1, maximumFractionDigits: 1 }
              ),
            });
          }
        }

        const table = $("#ship-mode").DataTable();
        table.clear();
        table.rows.add(dataArray);
        table.draw();
      }

      // Inisialisasi grafik dan tabel
      const ctx1 = document.getElementById("sales-profit").getContext("2d");
      const myChart = new Chart(ctx1, {
        type: "line",
        data: {
          labels: [], // Akan diisi saat update
          datasets: [
            {
              label: "Sales",
              data: [],
              borderColor: "rgba(255, 0, 0, 1)",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              fill: false,
            },
            {
              label: "Profit",
              data: [],
              borderColor: "rgba(0, 0, 255, 1)",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              fill: false,
            },
          ],
        },
        options: {
          responsive : true,
          maintainAspectRatio : false,
          scales: {
              y: {
              beginAtZero: true,
              },
              x: {
                  beginAtZero: true
              }
          },
          plugins: {
              zoom: {
                  pan: {
                      enabled: true,
                      mode: 'x' // Enable panning on the x-axis only
                  },
                  zoom: {
                      drag: true,
                      mode: 'x', // Enable zooming on the x-axis only
                      speed: 0.1
                  }
              }
          }
      },
      });

      const ctx2 = document.getElementById("mixedChart").getContext("2d");
      const mixedChart = new Chart(ctx2, {
        data: {
          labels: [], // Akan diisi saat update
          datasets: [
            {
              type: "line",
              label: "Sales",
              data: [],
              borderColor: "rgba(183,28,28,255)",
              borderWidth: 2,
              fill: false,
              yAxisID: "y-axis-1",
            },
            {
              type: "bar",
              label: "Discounted Products",
              data: [],
              backgroundColor: "#edc9c4",
              yAxisID: "y-axis-2",
            },
          ],
        },
        options: {
          responsive : true,
          maintainAspectRatio : false,
          scales: {
              yAxes: [
              {
                  type: "linear",
                  display: true,
                  position: "left",
                  id: "y-axis-1",
                  labels: {
                  show: true,
                  },
              },
              {
                  type: "linear",
                  display: true,
                  position: "right",
                  id: "y-axis-2",
                  labels: {
                  show: true,
                  },
                  gridLines: {
                  drawOnChartArea: false,
                  },
              },
              ],
          },
          plugins: {
              zoom: {
                  pan: {
                      enabled: true,
                      mode: 'x' // Enable panning on the x-axis only
                  },
                  zoom: {
                      drag: true,
                      mode: 'x', // Enable zooming on the x-axis only
                      speed: 0.1
                  }
              }
          }
        },
      });

      const segmentPieCtx = document
        .getElementById("segmentPieChart")
        .getContext("2d");
      const segmentPieChart = new Chart(segmentPieCtx, {
        type: "pie",
        data: {
          labels: [], // Akan diisi saat update
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(183,28,28,1)",
                "rgba(205,96,96,1)",
                "rgba(226,164,164,1)",
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: "right",
          },
        },
      });

      $("#sales-region").DataTable({
        scrollY: 250,
        scrollX: true,
        autoWidth: false,
        fixedColumns: true,
        columns: [
          { data: "Region/State" },
          { data: "Total Sales" },
          { data: "Total Orders" },
        ],
        order: [[1, "desc"]],
      });

      $("#sales-category").DataTable({
        scrollY: 250,
        scrollX: true,
        autoWidth: false,
        fixedColumns: true,
        columns: [
          { data: "Category" },
          { data: "Sub-Category" },
          { data: "Total Sales" },
          { data: "Total Quantity" },
        ],
        order: [[2, "desc"]],
      });

      $("#ship-mode").DataTable({
        scrollY: 150,
        scrollX: true,
        autoWidth: false,
        fixedColumns: true,
        columns: [
          { data: "Region" },
          { data: "Standard Class" },
          { data: "Second Class" },
          { data: "First Class" },
          { data: "Same Day" },
        ],
        order: [[1, "desc"]],
      });

      // Event listener untuk checkbox
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.addEventListener("change", updateAll);
        });

      // Inisialisasi pertama
      updateAll();
    });
});