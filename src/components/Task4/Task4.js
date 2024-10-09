const url = "https://test-share.shub.edu.vn/api/intern-test/input";

fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        let arr = data.data;
        let prefix_sum_type1 = new Array(arr.length + 1);
        prefix_sum_type1[0] = 0;
        let prefix_sum_type2 = new Array(arr.length + 1);
        prefix_sum_type2[0] = 0;
        for (let i = 1; i <= arr.length; i++) {
            prefix_sum_type1[i] = prefix_sum_type1[i - 1] + arr[i - 1];
            if (i % 2 == 0) {
                prefix_sum_type2[i] = prefix_sum_type2[i - 1] - arr[i - 1];
            } else {
                prefix_sum_type2[i] = prefix_sum_type2[i - 1] + arr[i - 1];
            }
        }
        let query = data.query;
        let ans = [];
        for (let i = 0; i < query.length; i++) {
            let type = query[i].type;
            let range = query[i].range;
            let l = range[0];
            let r = range[1] + 1;
            if (type === "1") {
                ans.push(prefix_sum_type1[r] - prefix_sum_type1[l]);
            } else {
                ans.push(prefix_sum_type2[r] - prefix_sum_type2[l]);
            }
        }
        let token = data.token;

        async function sendResults(results) {
            const body = JSON.stringify({ output: results });
            console.log(body);

            const response = await fetch(
                "https://test-share.shub.edu.vn/api/intern-test/output ",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: body,
                }
            );

            if (!response.ok) {
                console.error("Failed to send results:", response.statusText);
            } else {
                console.log("Results sent successfully");
            }
        }

        sendResults(ans);
    })
    .catch((error) => {
        console.error("Error:", error);
    });