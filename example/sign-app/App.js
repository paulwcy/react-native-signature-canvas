import { StyleSheet, View, ScrollView, Image, Text,  ImageBackground } from 'react-native';
import SignatureScreen from "react-native-signature-canvas";
import {useEffect, useRef, useState} from "react";
import {MySignatureCanvas} from "./ScrollSign";
import ViewShot from "react-native-view-shot";
import {SignatureScreen1} from "./example";

const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPkSURBVHjatJbfT1tlGMc/PQzKyhLaQs9AUIQuG9M2xnVbZgacEBN+7AYxc8E4t3hjnBpv9I5VnT1/gcnYLrfFaYZR6YURvNiwwBLHRgzFKGEWtvHLnm20KqyUcOoFPes5FWhp3HN1nud9zvPN+7zfPN/HpKoqmUz0BuqARqAeeA5wAHFgBrgDDAD9iiwNZqpl2gxQ9AbeBY4BEtlZALiiyFLXlgBFb6AKOAe0AlQWm3n1BZG6aiu7RQullnxW1ASz0WWmo8sMTUboCSrcXYhpJXqBU4osTWUEFL0BD+AHKiqLzZxuqqbN5SBPMG16NTUBPcEw8o+TTEeXASJAkyJLwxsCJsFuArTUltB1tJYd5jy2YovxVT70T/DtaFgLHdSDPgYUvYFngVuA/e2XKvis1UmGS21oiQR80vsH56/PADwEPFp7t+nyzgH2V9wOfK1OTGlg4+Elvrg1x9WJBaYePiI/T+BpqxnJaeMNTxl7dxal2maCMy1O5v+O0xNU7Ho+mFRVRfQGTgFdlcVmBj7YT1FBqo2xFZWPe0NcGp5FTax/I8EEb+4vx9fqpDBfMLS3/vOb2pu+r8jSWe20A6Czqfo/YB2Xgly4sTGYRpiLw3McvTDKo5UUJ4oK8vA212juMQBB9AYOAw2V1kLa3aKh0Kd9Ia5PRbN+uxt3/6Lz+9uGWJvLQaW1EKDBcfqnw0JygtDudhhIMh5e4uLw3JYJc3lkntHZfwztbnc7NLdRSI4r6mqshh+/HJlndbM+bsLQK7/8aYjpatcLgAugVrQYkvpvL5Crpf+rq+0SgFKAEku+IWlmjVk52XQkZvBLigq0T4fAE7CV1Y2fQgDuAzxYWjEcVBSbcwZ8xlZo8B8sxrVPRQB+1Vipt8ZdtpwBX95tN/i/p2qPCUnxZCAUMSS9vq+MbTkMU5MJOl7caYgNpmoPCMBVgJ6gYpgme0QLJw6UbxnwuKccd/mONNlSNPeaEPY1DAGBe5EY/jHFOGmaa6irtmYNdqiqGPmI0xDzjyncW2NtQJGlIY2l3QC+vhCL8dXHyYX5Al+dcPHWwac2ba9ggpMHyuk+6WZ72vD29YXQY+j18Aegpd3t4Pxre9eVp8uaPC3EIJGgyr6dxl02jnvKqNXJkzZx3vn6N75ba2evIkut6wnwCGD7PwT4TF+IrqFpgAVgnybAT2TF+Mg/wTepFeOQIks/Z71EeZtraHM5Mt5WTawRxNcX0gQ3CjTrwXJaE/eIFkqTs/H+Ypzx8BKDkxH8QYU7uayJacDvJZW6YQuLcLciS2c3HAylnf3ZFNKv+s8D2moQTo7GAeBaNqv+vwMApOmkagtYWsAAAAAASUVORK5CYII="

const dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='

const bgUrl = 'https://legacy.reactjs.org/logo-og.png';
const Sign = ({ text, onOK }) => {
  const ref = useRef();
  const [bg, setBg] = useState(bgUrl);

  const [, setIsScrollEnabled] = useState(false);

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature);
    onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(data);
  };

  const signHeight = 500;

  const height = 3;



  return (
      <SignatureScreen
          onBegin={() => setIsScrollEnabled(false)}
          bgHeight={100}
          trimWhitespace={true}
          scrollable={false}
          ref={ref}
          onClear={handleClear}
          onEmpty={handleEmpty}
          onEnd={handleEnd}
          onOK={handleOK}
          onGetData={handleData}
          autoClear={false}
          penColor={'rgba(255,255,255,0.5)'}
          style={{
            maxHeight: height * signHeight,
            overflow: "hidden",
          }}
          webviewContainerStyle={{
            maxHeight: height * signHeight,
          }}
          webStyle={`
                .m-signature-pad { max-Height: ${height} * ${signHeight}, margin:0px !important; overflow: hidden !important; background: black !important; border: none !important; border: 2px dashed #000; }  .m-signature-pad--footer   {display: none !important;}
                `}
      />
  );
};

const ScrollApp = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={scrollEnabled}>
          <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
          />
          <Image
              style={styles.logo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
              }}
          />
          <Text>
            <Text>First part and </Text>
            <Text>second part The element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. This means that elements inside of a  are no longer rectangles, but wrap when they see the end of the line.
              The element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. This means that elements inside of a  are no longer rectangles, but wrap when they see the end of the line.
              The element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. This means that elements inside of a  are no longer rectangles, but wrap when they see the end of the line.
              The element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. This means that elements inside of a  are no longer rectangles, but wrap when they see the end of the line.
              The element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. This means that elements inside of a  are no longer rectangles, but wrap when they see the end of the line.
            </Text>
          </Text>
          <View style={styles.box}>
            <MySignatureCanvas
                setScroll={setScrollEnabled}
            />
          </View>
        </ScrollView>
      </View>
  );
}


export default function App() {
  const [img, setImg] = useState(null);
  const [sign, setSign] = useState(null);
  const ref = useRef();
  const [bg, setBg] = useState(bgUrl);

  const onCapture = () => {
    ref.current.capture().then(uri => {
      console.log("do something with ", uri);
      setImg(uri);
      // setSign(null);
    });
  }

  useEffect(() => {
    if(sign) {
      setTimeout(() => {
        onCapture();
      }, 300)
    }
  }, [sign]);
  return (
      <View style={styles.container}>
        <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "png", quality: 0.9, result: 'data-uri' }}>
          {/*<ImageBackground source={{uri: bg}} style={styles.image}>*/}
          <View style={{
            width: 400,
            height: 800
          }}>
            {/*{sign ? (*/}
            {/*          <Image*/}
            {/*              resizeMode={"contain"}*/}
            {/*              style={{ width: 400, height: 300 }}*/}
            {/*              source={{ uri: sign }}*/}
            {/*          />*/}
            {/*) : <Sign text="Test" onOK={(img) => {*/}
            {/*  console.log('ok')*/}
            {/*  // setSign(img);*/}
            {/*  // onCapture();*/}
            {/*}} />}*/}
            <SignatureScreen1/>
          </View>
          {/*</ImageBackground>*/}
        </ViewShot>
        {/*<View style={styles.preview}>*/}
        {/*  {img ? (*/}
        {/*      <Image*/}
        {/*          resizeMode={"contain"}*/}
        {/*          style={{ width: 335, height: 114 }}*/}
        {/*          source={{ uri: img }}*/}
        {/*      />*/}
        {/*  ) : null}*/}
        {/*</View>*/}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 300,
  },
  preview: {
    height: 114,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    flex: 1,
  },
  box: {
    width: 400,
    height: 400,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  singnatureContainer: {
    backgroundColor: 'transparent',
  }
});
