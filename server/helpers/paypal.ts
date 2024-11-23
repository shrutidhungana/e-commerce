import paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: "sandbox",
  client_id:
    "AXaRMtuIktJRFQu7SfZXGG9ZWiMB-KxdnCGiQ48VCj-W9smGAYwad39Oz-HcQgQB_8sDry6wYVgjZg17",
  client_secret:
    "EKV6_NXrKYsFveS8ZkACATl7Uux-eRvxP8kBLgxjMq2zByp_JSu46ehuSnkLjsJNlNNKd6O53SjoJoh2",
});

export default paypal;