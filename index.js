const { Builder, By, Key, until } = require("selenium-webdriver");

const data = {
  contact: "Mehasafdf", // ENTER THE EXACT NAME OF THE CONTACT YPU WANT TO SEND THE MESSAGE TO
  message: "Testing", // ENTER THE MESSAGE YOU WANT TO SEND
  number: 1, // ENTER THE NUMBER OF TIMES YOU WANT TO SEND IT
};

async function clickElementByXPath(xpath) {
  const data = await driver.findElements(By.xpath(xpath));
  try {
    await data[0].click();
  } catch (err) {
    console.log("couldn't click item " + xpath);
  }
}

async function getElementAndSendKeysAndEnter(xpath, keys) {
  let ele = [];
  while (!ele[0]) ele = await driver.findElements(By.xpath(xpath));
  await ele[0].sendKeys(keys);
  await ele[0].sendKeys(Key.ENTER);
}

const main = async (contact, message, number) => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://web.whatsapp.com");

  await clickElementByXPath(
    `/html/body/div[1]/div/div/div[2]/div[1]/div/div[3]/label/input`
  );

  console.log(
    "Scan the QR code from your the Whatsapp App on your Android or iOS device to activate Whatsapp Web"
  );

  await getElementAndSendKeysAndEnter(
    `/html/body/div[1]/div/div/div[3]/div/div[1]/div/label/div/div[2]`,
    contact
  );

  for (let i = 0; i < number; i++)
    await getElementAndSendKeysAndEnter(
      `/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[2]/div/div[2]`,
      message
    );
};

main(data.contact, data.message, data.number);
