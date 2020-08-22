router.delete("/delete/:prodId", (req, res) => {
  let prodId = req.params.prodId;

  if (!isNaN(prodId)) {
    database
      .table("products")
      .filter({ id: prodId })
      .remove()
        .then(successNum => {
            if (successNum == 1) {
                res.status(200).json({
                    message: `Record deleted with product id ${prodId}`,
                    status: 'success'
                });
            } else {
                res.status(500).json({status: 'failure', message: 'Cannot delete the product'});
          }
      })
      .catch((err) => res.status(500).json(err));
  } else {
    res
      .status(500)
      .json({ message: "ID is not a valid number", status: "failure" });
  }
});


